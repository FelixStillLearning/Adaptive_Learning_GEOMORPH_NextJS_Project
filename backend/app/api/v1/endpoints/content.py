
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.content_service import content_service

router = APIRouter()

class QuestionRequest(BaseModel):
    difficulty: int
    emotion: str
    topic: str = "geometry"

class QuestionResponse(BaseModel):
    id: int
    question: str
    options: List[str]
    correct_answer: str
    hint: str
    difficulty: int = 1
    topic: str = "cube"

@router.post("/next", response_model=QuestionResponse)
async def get_next_question(data: QuestionRequest):
    """
    Get the next question from EduMorph Question Bank.
    """
    try:
        # Use ContentService (Local Bank) instead of LLM
        question_data = await content_service.get_question(
            difficulty=data.difficulty,
            emotion=data.emotion,
            topic=data.topic
        )
        return question_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
