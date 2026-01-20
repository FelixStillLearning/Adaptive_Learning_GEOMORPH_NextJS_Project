
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Emotion-Aware Adaptive Learning"
    API_V1_STR: str = "/api/v1"
    
    # Database
    # Using SQLite for ease of setup and portability
    # DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/emotion_learning_db"
    DATABASE_URL: str = "sqlite+aiosqlite:///./eduzenai.db"
    
    


    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    class Config:
        case_sensitive = True

settings = Settings()
