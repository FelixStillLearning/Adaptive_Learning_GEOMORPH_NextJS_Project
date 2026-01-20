
import numpy as np
from typing import Dict, List

class FuzzyAdaptiveSystem:
    def __init__(self):
        self.rules = self._initialize_rules()
        print("Fuzzy Adaptive System initialized")
    
    # 1. FUZZIFICATION FUNCTIONS
    def fuzzify_screen_time(self, seconds: float) -> Dict[str, float]:
        """Fuzzify screen reading time"""
        short = self._trapmf(seconds, 0, 0, 20, 40)
        normal = self._trimf(seconds, 20, 50, 80)
        long = self._trapmf(seconds, 60, 90, 300, 300)
        
        return {
            'short': round(short, 3),
            'normal': round(normal, 3),
            'long': round(long, 3)
        }
    
    def fuzzify_accuracy(self, score: float) -> Dict[str, float]:
        """Fuzzify accuracy score (0-1)"""
        low = self._trapmf(score, 0, 0, 0.3, 0.5)
        medium = self._trimf(score, 0.3, 0.6, 0.8)
        high = self._trapmf(score, 0.7, 0.9, 1, 1)
        
        return {
            'low': round(low, 3),
            'medium': round(medium, 3),
            'high': round(high, 3)
        }
    
    def fuzzify_response_time(self, seconds: float) -> Dict[str, float]:
        """Fuzzify response time for questions"""
        fast = self._trapmf(seconds, 0, 0, 15, 25)
        medium = self._trimf(seconds, 15, 35, 55)
        slow = self._trapmf(seconds, 45, 65, 120, 120)
        
        return {
            'fast': round(fast, 3),
            'medium': round(medium, 3),
            'slow': round(slow, 3)
        }
    
    def fuzzify_emotion(self, emotion: str) -> Dict[str, float]:
        """Fuzzify emotion state"""
        emotion_values = {
            'frustrated': {'negative': 0.9, 'neutral': 0.1, 'positive': 0.0},
            'anxious': {'negative': 0.8, 'neutral': 0.2, 'positive': 0.0}, # New mapped key
            'fear': {'negative': 0.8, 'neutral': 0.2, 'positive': 0.0},
            'confused': {'negative': 0.7, 'neutral': 0.3, 'positive': 0.0}, # New mapped key
            'confuse': {'negative': 0.7, 'neutral': 0.3, 'positive': 0.0},
            'bored': {'negative': 0.2, 'neutral': 0.7, 'positive': 0.1}, # New mapped key
            'neutral': {'negative': 0.1, 'neutral': 0.8, 'positive': 0.1},
            'surprise': {'negative': 0.1, 'neutral': 0.3, 'positive': 0.6},
            'happy': {'negative': 0.0, 'neutral': 0.2, 'positive': 0.8}
        }
        return emotion_values.get(emotion, emotion_values['neutral'])
    
    def fuzzify_hints_used(self, count: int) -> Dict[str, float]:
        """Fuzzify number of hints used"""
        few = self._trapmf(count, 0, 0, 1, 2)
        some = self._trimf(count, 1, 2, 3)
        many = self._trapmf(count, 2, 3, 5, 5)
        
        return {
            'few': round(few, 3),
            'some': round(some, 3),
            'many': round(many, 3)
        }
    
    # 2. FUZZY RULES
    def _initialize_rules(self) -> List[Dict]:
        """Initialize fuzzy inference rules"""
        # EMOTION-FIRST FUZZY RULES
        # Emotion is PRIMARY, Correctness & Speed are AMPLIFIERS
        
        return [
            # === POSITIVE EMOTION (Happy) ===
            # Happy + Correct + Fast = Maximum boost
            {
                'name': 'happy_correct_fast',
                'conditions': lambda f: min(
                    f['emotion']['positive'],   # Happy (REQUIRED)
                    f['accuracy']['high'],      # Correct
                    f['response_time']['fast']  # Fast
                ),
                'action': 'increase_much',  # +2 levels
                'weight': 1.0  # Highest priority
            },
            # Happy + Correct + Medium/Slow = Good boost
            {
                'name': 'happy_correct',
                'conditions': lambda f: min(
                    f['emotion']['positive'],   # Happy (REQUIRED)
                    f['accuracy']['high']       # Correct
                ),
                'action': 'increase',  # +1 level
                'weight': 0.9
            },
            # Happy + Wrong = Stay (enjoying learning, but wrong answer)
            {
                'name': 'happy_wrong',
                'conditions': lambda f: min(
                    f['emotion']['positive'],   # Happy (REQUIRED)
                    f['accuracy']['low']        # Wrong answer
                ),
                'action': 'stay',  # 0 (maintain level - happy but wrong)
                'weight': 0.6
            },
            
            # === NEUTRAL EMOTION ===
            # Neutral + Correct + Fast = Small boost
            {
                'name': 'neutral_correct_fast',
                'conditions': lambda f: min(
                    f['emotion']['neutral'],    # Neutral (REQUIRED)
                    f['accuracy']['high'],      # Correct
                    f['response_time']['fast']  # Fast
                ),
                'action': 'slight_increase',  # +0.5 level
                'weight': 0.7
            },
            # Neutral + Correct = Stay (focused but not excited)
            {
                'name': 'neutral_correct',
                'conditions': lambda f: min(
                    f['emotion']['neutral'],    # Neutral (REQUIRED)
                    f['accuracy']['high']       # Correct
                ),
                'action': 'stay',  # 0 (maintain level)
                'weight': 0.6
            },
            # Neutral + Wrong = Slight decrease
            {
                'name': 'neutral_wrong',
                'conditions': lambda f: min(
                    f['emotion']['neutral'],    # Neutral (REQUIRED)
                    f['accuracy']['low']        # Wrong answer
                ),
                'action': 'slight_decrease',  # -0.5 level
                'weight': 0.7
            },
            
            # === NEGATIVE EMOTION (Fear, Disgust, Angry, Sad) ===
            # Negative + Wrong = Maximum penalty
            {
                'name': 'negative_wrong',
                'conditions': lambda f: min(
                    f['emotion']['negative'],   # Negative (REQUIRED)
                    f['accuracy']['low']        # Wrong answer
                ),
                'action': 'decrease_much',  # -2 levels
                'weight': 1.0  # Highest priority
            },
            # Negative + Correct + Fast = Still decrease (stressed)
            {
                'name': 'negative_correct_fast',
                'conditions': lambda f: min(
                    f['emotion']['negative'],   # Negative (REQUIRED)
                    f['accuracy']['high'],      # Correct but stressed
                    f['response_time']['fast']  # Fast
                ),
                'action': 'slight_decrease',  # -0.5 level
                'weight': 0.8
            },
            # Negative + Correct + Slow = Slight boost (at least correct!)
            {
                'name': 'negative_correct_slow',
                'conditions': lambda f: min(
                    f['emotion']['negative'],   # Negative (REQUIRED)
                    f['accuracy']['high'],      # Correct - deserves reward
                    f['response_time']['slow']  # Slow = thinking hard
                ),
                'action': 'slight_increase',  # +0.5 level (at least correct!)
                'weight': 0.7
            }
        ]
    
    # 3. FUZZY INFERENCE
    def apply_rules(self, fuzzified_inputs: Dict) -> Dict[str, float]:
        """Apply fuzzy rules using Mamdani inference"""
        rule_outputs = {
            'decrease_much': 0.0,
            'decrease': 0.0,
            'slight_decrease': 0.0,
            'stay': 0.0,
            'slight_increase': 0.0,
            'increase': 0.0,
            'increase_much': 0.0
        }
        
        print(f"\n=== FUZZY RULES EVALUATION ===")
        for rule in self.rules:
            strength = rule['conditions'](fuzzified_inputs)
            weighted_strength = strength * rule['weight']
            
            if weighted_strength > 0.01:  # Only log significant activations
                print(f"Rule '{rule['name']}': strength={strength:.3f}, weighted={weighted_strength:.3f}, action={rule['action']}")
            
            if weighted_strength > rule_outputs[rule['action']]:
                rule_outputs[rule['action']] = round(weighted_strength, 3)
        
        print(f"Final rule outputs: {rule_outputs}")
        print(f"==============================\n")
        
        return rule_outputs
    
    # 4. DEFUZZIFICATION
    def defuzzify(self, rule_outputs: Dict[str, float]) -> float:
        """Defuzzify using Center of Gravity method"""
        centers = {
            'decrease_much': -2.0,
            'decrease': -1.0,
            'slight_decrease': -0.5,
            'stay': 0.0,
            'slight_increase': 0.5,
            'increase': 1.0,
            'increase_much': 2.0
        }
        
        numerator = 0.0
        denominator = 0.0
        
        for action, strength in rule_outputs.items():
            if strength > 0:
                numerator += strength * centers[action]
                denominator += strength
        
        if denominator == 0:
            return 0.0
        
        adjustment = numerator / denominator
        return round(adjustment, 3)
    
    # Helper functions
    def _trimf(self, x: float, a: float, b: float, c: float) -> float:
        if x <= a or x >= c: return 0.0
        elif a < x <= b: return (x - a) / (b - a)
        elif b < x < c: return (c - x) / (c - b)
        return 0.0
    
    def _trapmf(self, x: float, a: float, b: float, c: float, d: float) -> float:
        """Trapezoidal membership function with proper boundary handling"""
        if x < a or x > d: return 0.0
        elif a <= x < b: return (x - a) / (b - a) if b > a else 1.0
        elif b <= x <= c: return 1.0
        elif c < x <= d: return (d - x) / (d - c) if d > c else 1.0
        return 0.0

    def process_feedback(self, screen_time: float, accuracy: float, response_time: float, 
                        emotion: str, hints_used: int, current_level: int) -> Dict:
        """Main entry point for processing student feedback"""
        fuzzified = {
            'screen_time': self.fuzzify_screen_time(screen_time),
            'accuracy': self.fuzzify_accuracy(accuracy),
            'response_time': self.fuzzify_response_time(response_time),
            'emotion': self.fuzzify_emotion(emotion),
            'hints': self.fuzzify_hints_used(hints_used)
        }
        
        print(f"\n=== FUZZIFIED VALUES ===")
        print(f"Accuracy ({accuracy:.2f}): {fuzzified['accuracy']}")
        print(f"Response Time ({response_time:.2f}s): {fuzzified['response_time']}")
        print(f"Emotion ({emotion}): {fuzzified['emotion']}")
        print(f"========================\n")
        
        rule_outputs = self.apply_rules(fuzzified)
        adjustment = self.defuzzify(rule_outputs)
        
        
        new_level = current_level + adjustment
        new_level = max(1, min(5, round(new_level)))
        
        max_action = max(rule_outputs, key=rule_outputs.get)
        confidence = rule_outputs[max_action]
        
        # --- GeoMorph Specific Intervention Rules (Expert System Layer) ---
        # Updated to work with raw FER+ emotions
        intervention = "none"
        
        # Rule 1: IF (Any Negative Emotion) AND Screen Time Long (>10s) -> Hint
        # All negative emotions indicate struggle/confusion - show hint to help
        if (emotion in ["anger", "fear", "disgust", "frustrated", "anxious", "confused"]) and screen_time > 10:
            intervention = "show_hint"
            
        # Rule 2: IF (Neutral/Sad) AND Screen Time Long (>40s) -> Change Visual
        # Neutral/Sad for too long = Bored
        elif (emotion in ["sad"]) and screen_time > 10:
            intervention = "change_visual"
            
        # Rule 3: IF (Fear/Disgust) -> Decrease Difficulty
        # Fear/Disgust = Anxious/Stressed
        elif emotion in ["fear", "disgust"]:
             # Force at least a slight decrease if not already decreasing
             if adjustment >= 0:
                 adjustment = -0.5
                 new_level = max(1, current_level - 1)
        
        
        # Rule 4: DISABLED - Let base fuzzy logic handle level progression
        # The base fuzzy system already considers accuracy, response_time, emotion, and hints
        # This provides more balanced and gradual level adjustments
        # elif emotion == "happy" and screen_time < 10 and accuracy >= 1.0:
        #      if adjustment <= 0:
        #          adjustment = 1.0
        #          new_level = min(5, current_level + 1)
        #      print(f"FLOW STATE TRIGGERED! Emotion: {emotion}, Time: {screen_time}s, Accuracy: {accuracy}, Level: {current_level} -> {new_level}")


        print(f"Fuzzy Result: Emotion={emotion}, Time={screen_time}s, Acc={accuracy}, Level {current_level} -> {new_level} (adj={adjustment})")

        return {
            'current_level': current_level,
            'new_level': int(new_level),
            'adjustment': adjustment,
            'action': max_action,
            'confidence': confidence,
            'intervention': intervention, # New Output
            'fuzzy_outputs': rule_outputs
        }
