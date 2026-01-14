
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from datetime import timedelta
from typing import Any

from app.db.session import get_session
from app.models.user import User, UserCreate, UserRead
from app.core import security

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

@router.post("/register", response_model=UserRead)
async def register(user_in: UserCreate, session: AsyncSession = Depends(get_session)):
    # Check existing user
    query = select(User).where(User.email == user_in.email)
    result = await session.execute(query)
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    
    # Create user
    user = User(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=user_in.role
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user

@router.post("/token")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session)
):
    # Authenticate
    query = select(User).where(User.email == form_data.username)
    result = await session.execute(query)
    user = result.scalar_one_or_none()
    
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create token (simplified for prototype)
    # In production, implement proper JWT expiration
    return {
        "access_token": user.email, 
        "token_type": "bearer",
        "user_role": user.role
    }

from app.api.deps import get_current_active_user

@router.get("/me", response_model=UserRead)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    """
    Get current user.
    """
    return current_user
