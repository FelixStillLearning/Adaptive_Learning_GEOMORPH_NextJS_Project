import os
import base64
from typing import Dict, List
# from app.core.config import settings # Unused if API key is removed

class EmotionService:
    def __init__(self):
        self.net = None
        self.emotions = ['neutral', 'happy', 'surprise', 'sadness', 'anger', 'disgust', 'fear', 'contempt']
        
        # Load ONNX model (Opset 12)
        model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ml_models", "emotion-ferplus-12.onnx")
        try:
            if not os.path.exists(model_path):
                print(f"ONNX Model not found at: {model_path}")
            else:
                import cv2
                self.net = cv2.dnn.readNetFromONNX(model_path)
                print(f"Local Emotion AI (ONNX Opset 12) Loaded! Path: {model_path}")
                
                # Load Haar Cascade for face detection
                self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
                print(f"Face Detection Cascade Loaded!")
        except Exception as e:
            print(f"Failed to load ONNX model: {e}")

    async def predict(self, base64_image: str) -> Dict[str, float]:
        """
        Predict emotion from base64 image using local ONNX model (OpenCV DNN).
        """
        if not self.net:
            return {"emotion": "neutral", "confidence": 0.0}

        try:
            import cv2
            import numpy as np

            # Decode image
            if "," in base64_image:
                base64_image = base64_image.split(",")[1]
            
            image_data = base64.b64decode(base64_image)
            nparr = np.frombuffer(image_data, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if img is None:
                return {"emotion": "neutral", "confidence": 0.0}

            # Preprocessing for ONNX:
            # 1. Convert to Grayscale
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # 2. Detect Face and Crop (NEW - Improves accuracy!)
            faces = self.face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
            
            if len(faces) > 0:
                # Use the largest face detected
                (x, y, w, h) = max(faces, key=lambda face: face[2] * face[3])
                face_roi = gray[y:y+h, x:x+w]
            else:
                # No face detected, use entire image (fallback)
                face_roi = gray
            
            # 3. Resize to 64x64
            # 4. Create Blob (This handles resizing and scaling)
            # Input is 64x64 grayscale (1 channel)
            blob = cv2.dnn.blobFromImage(face_roi, 1.0, (64, 64), (0, 0, 0), swapRB=False, crop=False)
            
            # 4. Forward Pass
            self.net.setInput(blob)
            scores = self.net.forward()
            
            # 5. Softmax
            scores = scores[0] # Get first sample
            exp_scores = np.exp(scores - np.max(scores))
            probs = exp_scores / np.sum(exp_scores)
            
            # 6. Get best class
            best_idx = np.argmax(probs)
            raw_emotion = self.emotions[best_idx]
            confidence = float(probs[best_idx])
            
            # Normalize emotion names to match common usage
            if raw_emotion == 'happiness': 
                emotion = 'happy'
            elif raw_emotion == 'sadness': 
                emotion = 'sad'
            else:
                emotion = raw_emotion
            
            return {
                "emotion": emotion,
                "confidence": confidence,
                "raw_emotion": raw_emotion
            }

        except Exception as e:
            print(f"Prediction Error: {e}")
            return {"emotion": "neutral", "confidence": 0.0}

emotion_service = EmotionService()
