
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from typing import Dict, Any, List
from pydantic import BaseModel

from app.db.session import get_session
from app.models.session import LearningSession, LearningSessionCreate, LearningSessionRead
from app.models.interaction import InteractionLog, EmotionLog
from app.services.fuzzy_logic import FuzzyAdaptiveSystem
from app.services.emotion_service import emotion_service

router = APIRouter()
fuzzy_system = FuzzyAdaptiveSystem()

class AnswerSubmit(BaseModel):
    session_id: str
    question_id: str
    answer: str
    correct_answer: str
    time_taken: float
    hints_used: int
    current_level: int
    screen_time: float # for fuzzy input

class EmotionInput(BaseModel):
    session_id: str
    image_base64: str

class MonitorInput(BaseModel):
    emotion: str
    screen_time: float

@router.post("/session/start", response_model=LearningSessionRead)
async def start_session(
    session_in: LearningSessionCreate, 
    db: AsyncSession = Depends(get_session)
):
    session = LearningSession.from_orm(session_in)
    db.add(session)
    await db.commit()
    await db.refresh(session)
    return session

@router.post("/submit-answer")
async def submit_answer(
    data: AnswerSubmit,
    db: AsyncSession = Depends(get_session)
):
    # 1. Get latest emotion for this session from database
    from sqlmodel import select
    from app.models.interaction import EmotionLog
    from uuid import UUID
    
    # Convert session_id to UUID object for database compatibility
    try:
        session_uuid = UUID(data.session_id) if isinstance(data.session_id, str) else data.session_id
    except ValueError:
        # Fallback to demo UUID if invalid format
        session_uuid = UUID("00000000-0000-0000-0000-000000000001")
        print(f"Warning: Invalid UUID '{data.session_id}', using demo UUID")
    
    # Query latest emotion log
    emotion = "neutral"  # Default fallback
    try:
        stmt = select(EmotionLog).where(
            EmotionLog.session_id == session_uuid
        ).order_by(EmotionLog.timestamp.desc()).limit(1)
        
        result = await db.execute(stmt)
        latest_emotion_log = result.scalar_one_or_none()
        
        if latest_emotion_log:
            emotion = latest_emotion_log.detected_emotion
            print(f">> Using emotion from DB: {emotion} (confidence: {latest_emotion_log.confidence:.2f})")
        else:
            print(f"-- No emotion log found for session, using default: neutral")
    except Exception as e:
        print(f"!! Error fetching emotion: {e}, using default: neutral")
    
    
    # 2. Process Fuzzy Logic
    # Calculate accuracy
    is_correct = data.answer.lower().strip() == data.correct_answer.lower().strip()
    accuracy = 1.0 if is_correct else 0.0
    
    print(f"\n=== FUZZY LOGIC INPUT ===")
    print(f"Emotion: {emotion}")
    print(f"Screen Time: {data.screen_time}s")
    print(f"Response Time: {data.time_taken}s")
    print(f"Accuracy: {accuracy} (Correct: {is_correct})")
    print(f"Hints Used: {data.hints_used}")
    print(f"Current Level: {data.current_level}")
    print(f"========================\n")
    
    fuzzy_result = fuzzy_system.process_feedback(
        screen_time=data.screen_time,
        accuracy=accuracy,
        response_time=data.time_taken,
        emotion=emotion,  # Now using REAL emotion from webcam!
        hints_used=data.hints_used,
        current_level=data.current_level
    )

    # 3. Log Interaction
    log = InteractionLog(
        session_id=session_uuid,
        question_id=data.question_id,
        answer_given=data.answer,
        is_correct=is_correct,
        time_taken=data.time_taken,
        hints_used_count=data.hints_used,
        ai_difficulty_adj=fuzzy_result['adjustment']
    )
    db.add(log)
    
    # 4. Update Session Progress (CRITICAL FIX)
    stmt_session = select(LearningSession).where(LearningSession.id == session_uuid)
    result_session = await db.execute(stmt_session)
    session = result_session.scalar_one_or_none()
    
    new_level_val = 1
    
    if session:
        # Initialize proficiency if None (for legacy reasons)
        if session.proficiency is None:
            session.proficiency = float(session.current_level)
            
        # Accumulate adjustment
        session.proficiency += fuzzy_result['adjustment']
        
        # Clamp proficiency 1.0 - 5.9
        session.proficiency = max(1.0, min(5.9, session.proficiency))
        
        # Determine discrete level from proficiency
        new_level_val = int(session.proficiency)
        
        session.current_level = new_level_val
        session.total_questions += 1
        if is_correct:
            session.total_correct += 1
            
        db.add(session) # Mark as modified
    else:
        print(f"!! Critical: Session {session_uuid} not found for update")

    # Override fuzzy_result 'new_level' with the ACTUAL persisted level based on proficiency
    # This ensures the frontend sees the result of the accumulation (e.g. 1.8 -> 2.2)
    fuzzy_result['new_level'] = session.current_level
    fuzzy_result['proficiency'] = session.proficiency # Optional: helpful for debugging

    await db.commit()

    return {
        "status": "success",
        "is_correct": is_correct,
        "fuzzy_feedback": fuzzy_result
    }

@router.post("/predict-emotion")
async def predict_emotion(
    data: EmotionInput,
    db: AsyncSession = Depends(get_session)
):
    # 1. Predict
    result = await emotion_service.predict(data.image_base64)
    
    # 2. Log to DB
    # Ensure session_id is UUID
    from uuid import UUID
    try:
        session_uuid = UUID(data.session_id) if isinstance(data.session_id, str) else data.session_id
    except ValueError:
        # If invalid UUID key (e.g. from testing), generate a tempoary one or handle error
        # For now, let's create a dummy UUID if valid one isn't provided, to keep logic flowing
        import uuid
        session_uuid = uuid.uuid4() 
        print(f"Warning: Invalid UUID '{data.session_id}' received. Using random UUID for logging.")
    
    log = EmotionLog(
        session_id=session_uuid,
        detected_emotion=result['emotion'],
        confidence=result['confidence']
    )
    db.add(log)
    await db.commit()

    return result


@router.post("/monitor")
async def monitor_intervention(data: MonitorInput):
    """
    Real-time check for interventions (Hint, Visual Change).
    Does NOT affect level, only returns 'intervention' action.
    """
    # Use dummy values for non-monitoring inputs
    # We only care about Emotion + Time rules here
    fuzzy_result = fuzzy_system.process_feedback(
        screen_time=data.screen_time,
        accuracy=0.0,
        response_time=0.0,
        emotion=data.emotion,
        hints_used=0,
        current_level=1
    )
    
    return {
        "intervention": fuzzy_result.get("intervention", "none")
    }
