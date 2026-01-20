
from typing import Optional
from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime

class LearningSessionBase(SQLModel):
    user_id: UUID = Field(foreign_key="user.id")
    initial_mood: Optional[str] = None
    start_time: datetime = Field(default_factory=datetime.utcnow)

class LearningSession(LearningSessionBase, table=True):
    __tablename__ = "learning_sessions"
    
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True, index=True)
    current_level: int = Field(default=1)  # Track current difficulty level
    total_correct: int = Field(default=0)  # Total correct answers
    total_questions: int = Field(default=0)  # Total questions answered
    end_time: Optional[datetime] = None
    final_score: Optional[float] = None
    is_completed: bool = False
    proficiency: float = Field(default=1.0) # Track granular progress (decimal level)

class LearningSessionCreate(LearningSessionBase):
    pass

class LearningSessionRead(LearningSessionBase):
    id: UUID
    current_level: int
    total_correct: int
    total_questions: int
    end_time: Optional[datetime]
    is_completed: bool
