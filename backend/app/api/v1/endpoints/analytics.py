
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select, func
from uuid import UUID
from datetime import datetime, timedelta
from typing import List, Dict
from pydantic import BaseModel

from app.db.session import get_session
from app.models.interaction import EmotionLog, InteractionLog
from app.models.session import LearningSession

router = APIRouter()


# --- Response Models ---
class EmotionStats(BaseModel):
    emotion: str
    count: int
    percentage: float


class TopicAccuracy(BaseModel):
    topic: str
    total: int
    correct: int
    accuracy: float


class LevelProgression(BaseModel):
    timestamp: str
    level: int


class AnalyticsSummary(BaseModel):
    total_sessions: int
    total_questions: int
    total_correct: int
    overall_accuracy: float
    current_level: int
    emotions: List[EmotionStats]
    topic_accuracy: List[TopicAccuracy]


from app.api.deps import get_current_active_user
from app.models.user import User
from app.services.content_service import content_service

# ...

@router.get("/summary")
async def get_analytics_summary(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_session)
) -> AnalyticsSummary:
    """Get comprehensive analytics summary for user"""
    user_uuid = current_user.id
    
    # Get session stats (Ordered by start_time to get true latest)
    session_stmt = select(LearningSession).where(
        LearningSession.user_id == user_uuid
    ).order_by(LearningSession.start_time.asc())
    
    session_result = await db.execute(session_stmt)
    sessions = session_result.scalars().all()
    
    total_sessions = len(sessions)
    total_questions = sum(s.total_questions for s in sessions)
    total_correct = sum(s.total_correct for s in sessions)
    current_level = sessions[-1].current_level if sessions else 1
    overall_accuracy = (total_correct / total_questions * 100) if total_questions > 0 else 0
    
    # Get emotion distribution (last 7 days)
    week_ago = datetime.utcnow() - timedelta(days=7)
    emotion_stmt = select(EmotionLog).where(
        EmotionLog.timestamp >= week_ago
    )
    emotion_result = await db.execute(emotion_stmt)
    emotion_logs = emotion_result.scalars().all()
    
    emotion_counts: Dict[str, int] = {}
    for log in emotion_logs:
        emotion_counts[log.detected_emotion] = emotion_counts.get(log.detected_emotion, 0) + 1
    
    total_emotions = sum(emotion_counts.values()) or 1
    emotions = [
        EmotionStats(
            emotion=e, 
            count=c, 
            percentage=round(c / total_emotions * 100, 1)
        ) 
        for e, c in sorted(emotion_counts.items(), key=lambda x: -x[1])
    ]
    
    # Build question->topic lookup from content bank (avoids relying on encoded IDs)
    question_topic_map: Dict[str, str] = {
        str(q.get("id")): q.get("topic", "general")
        for q in content_service.questions
    }

    # Get topic accuracy
    interaction_stmt = select(InteractionLog).join(LearningSession).where(
        LearningSession.user_id == user_uuid
    )
    interaction_result = await db.execute(interaction_stmt)
    interactions = interaction_result.scalars().all()
    
    topic_stats: Dict[str, Dict] = {}
    for log in interactions:
        topic = question_topic_map.get(str(log.question_id), 'general')
        if topic not in topic_stats:
            topic_stats[topic] = {'total': 0, 'correct': 0}
        topic_stats[topic]['total'] += 1
        if log.is_correct:
            topic_stats[topic]['correct'] += 1
    
    topic_accuracy = [
        TopicAccuracy(
            topic=t,
            total=s['total'],
            correct=s['correct'],
            accuracy=round(s['correct'] / s['total'] * 100, 1) if s['total'] > 0 else 0
        )
        for t, s in topic_stats.items()
    ]
    
    return AnalyticsSummary(
        total_sessions=total_sessions,
        total_questions=total_questions,
        total_correct=total_correct,
        overall_accuracy=round(overall_accuracy, 1),
        current_level=current_level,
        emotions=emotions,
        topic_accuracy=topic_accuracy
    )


@router.get("/emotion-history")
async def get_emotion_history(
    days: int = 7,
    db: AsyncSession = Depends(get_session)
) -> List[Dict]:
    """Get emotion distribution over time"""
    start_date = datetime.utcnow() - timedelta(days=days)
    
    stmt = select(EmotionLog).where(EmotionLog.timestamp >= start_date)
    result = await db.execute(stmt)
    logs = result.scalars().all()
    
    # Group by day and emotion
    daily_emotions: Dict[str, Dict[str, int]] = {}
    for log in logs:
        day = log.timestamp.strftime("%Y-%m-%d")
        if day not in daily_emotions:
            daily_emotions[day] = {}
        emotion = log.detected_emotion
        daily_emotions[day][emotion] = daily_emotions[day].get(emotion, 0) + 1
    
    return [
        {"date": day, **emotions}
        for day, emotions in sorted(daily_emotions.items())
    ]


@router.get("/level-progression")
async def get_level_progression(
    db: AsyncSession = Depends(get_session)
) -> List[LevelProgression]:
    """Get level changes over time from interaction logs"""
    stmt = select(InteractionLog).order_by(InteractionLog.timestamp.asc())
    result = await db.execute(stmt)
    logs = result.scalars().all()
    
    progression = []
    current_level = 1
    
    for log in logs:
        new_level = max(1, min(5, int(current_level + log.ai_difficulty_adj)))
        if new_level != current_level:
            progression.append(LevelProgression(
                timestamp=log.timestamp.isoformat(),
                level=new_level
            ))
            current_level = new_level
    
    return progression
