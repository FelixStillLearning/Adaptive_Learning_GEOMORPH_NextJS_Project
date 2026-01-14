
from typing import Optional
from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime

class EmotionLog(SQLModel, table=True):
    __tablename__ = "emotion_logs"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: UUID = Field(foreign_key="learning_sessions.id")
    detected_emotion: str  # e.g., "happy", "confused"
    confidence: float
    source: str = "face" # "face" or "behavior" or "fusion"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class InteractionLog(SQLModel, table=True):
    __tablename__ = "interaction_logs"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: UUID = Field(foreign_key="learning_sessions.id")
    question_id: str 
    answer_given: str
    is_correct: bool
    time_taken: float # in seconds
    hints_used_count: int = 0
    ai_difficulty_adj: float = 0.0 # Result from fuzzy logic
    timestamp: datetime = Field(default_factory=datetime.utcnow)
