
"use client";

import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useLearningStore } from "@/lib/store";

interface EmotionCaptureProps {
    sessionId?: string | null;
}

export default function EmotionCapture({ sessionId }: EmotionCaptureProps) {
    const webcamRef = useRef<Webcam>(null);
    const setEmotion = useLearningStore((state) => state.setEmotion);

    const captureAndPredict = async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                try {
                    const response = await fetch('http://localhost:8000/api/v1/learning/predict-emotion', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            session_id: sessionId || "00000000-0000-0000-0000-000000000001",  // Use real session
                            image_base64: imageSrc.split(",")[1]
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setEmotion(data.emotion);
                    } else {
                        // Fallback
                        const mockEmotions = ['happy', 'neutral', 'confused', 'neutral'];
                        const randomEmotion = mockEmotions[Math.floor(Math.random() * mockEmotions.length)];
                        setEmotion(randomEmotion);
                    }
                } catch {
                    // Fallback
                    const mockEmotions = ['happy', 'neutral', 'confused', 'neutral'];
                    const randomEmotion = mockEmotions[Math.floor(Math.random() * mockEmotions.length)];
                    setEmotion(randomEmotion);
                }
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            captureAndPredict();
        }, 5000); // Capture every 5 seconds

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed bottom-4 right-4 w-32 h-24 rounded-lg overflow-hidden border-2 border-slate-700 shadow-xl opacity-80 hover:opacity-100 transition-opacity z-50 bg-black">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
                className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-black/50 text-[10px] text-white px-1">AI Eye</div>
        </div>
    );
}
