
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from uuid import UUID
from datetime import datetime, timedelta
from typing import Optional
from pydantic import BaseModel

from app.db.session import get_session
from app.models.session import LearningSession, LearningSessionRead
from app.models.interaction import EmotionLog, InteractionLog

router = APIRouter()


# --- Request/Response Models ---
class SessionResponse(BaseModel):
    session_id: str
    current_level: int
    total_correct: int
    total_questions: int
    accuracy: float


class UpdateLevelRequest(BaseModel):
    new_level: int


from app.api.deps import get_current_active_user
from app.models.user import User

# ...

# --- Session Endpoints ---
@router.get("/current")
async def get_or_create_session(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_session)
) -> SessionResponse:
    """Get current active session or create new one"""
    user_uuid = current_user.id
    
    # Find active session (not completed, started today)
    today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    stmt = select(LearningSession).where(
        LearningSession.user_id == user_uuid,
        LearningSession.is_completed == False,
        LearningSession.start_time >= today
    ).order_by(LearningSession.start_time.desc()).limit(1)
    
    result = await db.execute(stmt)
    session = result.scalar_one_or_none()
    
    if not session:
        # Create new session
        session = LearningSession(
            user_id=user_uuid,
            current_level=1,
            total_correct=0,
            total_questions=0
        )
        db.add(session)
        await db.commit()
        await db.refresh(session)
        print(f"Created new session: {session.id}")
    else:
        print(f"Using existing session: {session.id}")
    
    accuracy = (session.total_correct / session.total_questions * 100) if session.total_questions > 0 else 0
    
    return SessionResponse(
        session_id=str(session.id),
        current_level=session.current_level,
        total_correct=session.total_correct,
        total_questions=session.total_questions,
        accuracy=round(accuracy, 1)
    )


@router.patch("/{session_id}/level")
async def update_session_level(
    session_id: str,
    request: UpdateLevelRequest,
    db: AsyncSession = Depends(get_session)
):
    """Update session level"""
    stmt = select(LearningSession).where(LearningSession.id == UUID(session_id))
    result = await db.execute(stmt)
    session = result.scalar_one_or_none()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session.current_level = max(1, min(5, request.new_level))  # Clamp 1-5
    await db.commit()
    
    return {"status": "success", "new_level": session.current_level}


@router.patch("/{session_id}/progress")
async def update_session_progress(
    session_id: str,
    is_correct: bool,
    new_level: int,
    db: AsyncSession = Depends(get_session)
):
    """Update session progress after answering"""
    stmt = select(LearningSession).where(LearningSession.id == UUID(session_id))
    result = await db.execute(stmt)
    session = result.scalar_one_or_none()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session.total_questions += 1
    if is_correct:
        session.total_correct += 1
    session.current_level = max(1, min(5, new_level))
    
    await db.commit()
    
    return {
        "status": "success", 
        "current_level": session.current_level,
        "total_correct": session.total_correct,
        "total_questions": session.total_questions
    }


@router.post("/{session_id}/complete")
async def complete_session(
    session_id: str,
    db: AsyncSession = Depends(get_session)
):
    """Mark session as completed"""
    stmt = select(LearningSession).where(LearningSession.id == UUID(session_id))
    result = await db.execute(stmt)
    session = result.scalar_one_or_none()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session.is_completed = True
    session.end_time = datetime.utcnow()
    
    # Calculate final score (accuracy * level factor)
    accuracy = (session.total_correct / session.total_questions) if session.total_questions > 0 else 0
    session.score = accuracy * session.current_level * 10
    
    await db.commit()
    
    return {"status": "success", "final_score": session.score}


@router.post("/reset")
async def reset_progress(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_session)
):
    """
    DANGER: Reset all learning progress for the current user.
    Deletes all LearningSession records.
    """
    from sqlmodel import delete
    
    # Delete all sessions for this user
    stmt = delete(LearningSession).where(LearningSession.user_id == current_user.id)
    result = await db.execute(stmt)
    
    await db.commit()
    
    return {
        "status": "success", 
        "message": f"Deleted {result.rowcount} sessions. Progress reset to Level 1."
    }
