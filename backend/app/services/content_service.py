
import json
import random
import os
from typing import List, Dict, Optional

class ContentService:
    def __init__(self):
        self.questions = []
        self._load_questions()

    def _load_questions(self):
        """Loads questions from the local JSON file."""
        try:
            file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "questions.json")
            with open(file_path, "r") as f:
                self.questions = json.load(f)
            print(f"EduMorph Content Bank Loaded: {len(self.questions)} questions.")
        except Exception as e:
            print(f"Error loading questions: {e}")
            self.questions = []

    async def get_question(self, difficulty: int, emotion: str, topic: str = "geometry") -> Dict:
        """
        Selects a question based on difficulty.
        Caps difficulty at 5 (max difficulty available).
        Topic and Emotion can be used for future filtering.
        """
        # Cap difficulty at 5 (max difficulty in question bank)
        capped_difficulty = min(5, max(1, difficulty))
        
        # Filter by difficulty (exact match)
        candidates = [q for q in self.questions if q["difficulty"] == capped_difficulty]
        
        # Fallback: If no questions for this exact difficulty, find nearest
        if not candidates:
            # Try +/- 1 level
            candidates = [q for q in self.questions if abs(q["difficulty"] - capped_difficulty) <= 1]
        
        # Fallback: Any question
        if not candidates:
            candidates = self.questions
            
        if not candidates:
             return {
                "question": "No questions available in the bank.",
                "options": ["Error"],
                "correct_answer": "Error",
                "hint": "Please check backend configuration."
            }

        # Select random question from candidates
        selected = random.choice(candidates)
        
        return {
            "question": selected["question"],
            "options": selected["options"],
            "correct_answer": selected["correct_answer"],
            "hint": selected["hint"],
            "id": selected["id"],
            "difficulty": selected["difficulty"],
            "topic": selected["topic"]
        }

content_service = ContentService()
