from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Emotion-Aware Adaptive Learning API",
    description="Backend API for AI-based adaptive learning system",
    version="1.0.0",
)

from app.core.config import settings
from app.api.v1.endpoints import auth, learning, content, session, analytics

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(learning.router, prefix="/api/v1/learning", tags=["learning"])
app.include_router(content.router, prefix="/api/v1/content", tags=["content"])
app.include_router(session.router, prefix="/api/v1/session", tags=["session"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["analytics"])

@app.get("/")
async def root():
    return {"message": "Welcome to Emotion-Aware Adaptive Learning API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
