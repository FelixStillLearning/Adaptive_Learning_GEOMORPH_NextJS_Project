"""
Database seeding script to create default test users.
Run this after alembic upgrade head to populate test data.
"""
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import select

from app.models.user import User, UserRole
from app.core.security import get_password_hash
from app.core.config import settings

async def seed_database():
    """Create default test users."""
    # Get database URL
    database_url = settings.DATABASE_URL
    
    # Create async engine
    engine = create_async_engine(
        database_url,
        echo=False,
        future=True,
    )
    
    # Create async session factory
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    
    async with async_session() as session:
        # Check if users already exist
        query = select(User).where(User.email == "student@example.com")
        result = await session.execute(query)
        if result.scalar_one_or_none():
            print("Default users already exist. Skipping seed.")
            await engine.dispose()
            return
        
        # Create default users
        users = [
            User(
                email="student@example.com",
                full_name="Test Student",
                hashed_password=get_password_hash("password123"),
                role=UserRole.STUDENT,
                is_active=True
            ),
            User(
                email="teacher@example.com",
                full_name="Test Teacher",
                hashed_password=get_password_hash("password123"),
                role=UserRole.TEACHER,
                is_active=True
            ),
            User(
                email="admin@example.com",
                full_name="Test Admin",
                hashed_password=get_password_hash("password123"),
                role=UserRole.ADMIN,
                is_active=True
            ),
        ]
        
        for user in users:
            session.add(user)
        
        await session.commit()
        print("✓ Default users created:")
        print("  - student@example.com (password: password123)")
        print("  - teacher@example.com (password: password123)")
        print("  - admin@example.com (password: password123)")
    
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(seed_database())
