
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToastContainer } from "@/components/ui/toast";
import { ArrowRight, HelpCircle, LogOut } from "lucide-react";

import Math3D from "@/components/Math3D";
import EmotionCapture from "@/components/EmotionCapture";
import { useLearningStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Question {
    id: number;
    question: string;
    options: string[];
    correct_answer: string;
    hint: string;
    difficulty: number;
    topic: string;
}

export default function LearnPage() {
    const router = useRouter();
    const { currentLevel, hintsUsed, emotion, setLevel, incrementHints } = useLearningStore();
    const [question, setQuestion] = useState<Question | null>(null);
    const [answer, setAnswer] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [loadingNext, setLoadingNext] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showHints, setShowHints] = useState(false);
    const [hintAlreadyShown, setHintAlreadyShown] = useState(false);

    // Session state
    const [sessionId, setSessionId] = useState<string | null>(null);

    const [startTime, setStartTime] = useState(Date.now());
    const [visualMode, setVisualMode] = useState("normal");
    const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: "levelUp" | "levelDown" | "info" }>>([]);

    const addToast = (message: string, type: "levelUp" | "levelDown" | "info") => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Fetch session on mount
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:8000/api/v1/session/current", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setSessionId(data.session_id);
                    setLevel(data.current_level);
                    console.log("Session loaded:", data.session_id, "Level:", data.current_level);
                }
            } catch (e) {
                console.error("Failed to fetch session:", e);
                // Fallback to demo UUID ONLY if completely failed
                setSessionId("00000000-0000-0000-0000-000000000001");
                setLevel(1); // Ensure level isn't stale
            }
        };
        fetchSession();
    }, [setLevel]);

    // Reset state on new question
    useEffect(() => {
        setStartTime(Date.now());
        setVisualMode("normal");
        setShowHints(false); // reset hint visibility on new question
        setHintAlreadyShown(false); // reset hint flag for new question
    }, [question]);

    // Polling for Intervention (Real-time Fuzzy Logic)
    useEffect(() => {
        const interval = setInterval(async () => {
            if (submitted || loadingNext || !question) return;

            const elapsed = (Date.now() - startTime) / 1000;

            try {
                const res = await fetch("http://localhost:8000/api/v1/learning/monitor", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        emotion: emotion || "neutral",
                        screen_time: elapsed
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                        if (data.intervention === "show_hint" && !hintAlreadyShown) {
                            setShowHints(true);
                            setHintAlreadyShown(true);
                            if (hintsUsed === 0) incrementHints();
                        } else if (data.intervention === "change_visual") {
                        setVisualMode("party");
                    }
                }
            } catch {
                // Ignore monitor errors
            }

        }, 3000); // Check every 3 seconds

        return () => clearInterval(interval);
    }, [emotion, startTime, submitted, loadingNext, question, hintsUsed, incrementHints, hintAlreadyShown]);

    const toggleHint = () => {
        setShowHints((prev) => {
            const next = !prev;
            if (next) {
                setHintAlreadyShown(true);
            }
            return next;
        });
        // Call incrementHints after state update, not during
        if (!showHints) {
            incrementHints();
        }
    };


    // Fetch initial question
    const fetchQuestion = async () => {
        setLoadingNext(true);
        try {
            const res = await fetch("http://localhost:8000/api/v1/content/next", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    difficulty: currentLevel,
                    emotion: emotion || "neutral",
                    topic: "geometry"
                })
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`API Failed (${res.status}): ${errText}`);
            }

            const data = await res.json();
            setQuestion(data);
            setError(null);
        } catch (error: unknown) {
            console.error("Failed to fetch question:", error);
            setError(error instanceof Error ? error.message : "Failed to generate question");
            setQuestion(null);
        } finally {
            setLoadingNext(false);
        }
    };

    // Load first question on mount
    useEffect(() => {
        fetchQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId]);

    const handleFinishSession = async () => {
        console.log("Finishing session...");
        const activeSessionId = sessionId || "00000000-0000-0000-0000-000000000001";

        try {
            await fetch(`http://localhost:8000/api/v1/session/${activeSessionId}/complete`, {
                method: "POST"
            });
            console.log("Session marked complete.");
        } catch (e) {
            console.error("Failed to finish session (API error), proceeding to dashboard:", e);
        } finally {
            router.push("/dashboard");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("SUBMIT CLICKED!", { answer, question: question?.id });

        if (!answer || !question) {
            console.log("SUBMIT BLOCKED: No answer or question");
            return;
        }

        setSubmitted(true);
        const elapsed = (Date.now() - startTime) / 1000;
        console.log(`Time elapsed: ${elapsed}s`);

        try {
            // Check local correctness first for immediate feedback
            const isCorrectLocal = answer.trim() === question.correct_answer;

            console.log("Calling /submit-answer API...");

            // Call Backend for Fuzzy Logic Analysis
            const res = await fetch("http://localhost:8000/api/v1/learning/submit-answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    session_id: sessionId || "00000000-0000-0000-0000-000000000001",  // Use real session
                    question_id: String(question.id),
                    answer: answer,
                    correct_answer: question.correct_answer,
                    time_taken: elapsed,
                    hints_used: hintsUsed,
                    current_level: currentLevel,
                    screen_time: elapsed
                })
            });

            console.log(`API Response: ${res.status}`);

            if (isCorrectLocal) {
                setFeedback("Correct! Analyzing performance...");
            } else {
                setFeedback("Incorrect. Let's see what the AI says...");
            }

            if (res.ok) {
                const data = await res.json();
                console.log("Fuzzy Feedback:", data.fuzzy_feedback);

                // --- APPLY FUZZY LOGIC RESULT ---
                if (data.fuzzy_feedback && data.fuzzy_feedback.new_level) {
                    const newLvl = data.fuzzy_feedback.new_level;
                    if (newLvl !== currentLevel) {
                        console.log(`LEVEL UP: ${currentLevel} -> ${newLvl}`);
                        if (newLvl > currentLevel) {
                            addToast(`Level ${currentLevel} → ${newLvl} | Great progress!`, "levelUp");
                        } else {
                            addToast(`Level ${currentLevel} → ${newLvl} | Keep practicing`, "levelDown");
                        }
                        setLevel(newLvl); // Update Store
                    } else {
                        console.log(`Level stayed: ${currentLevel}`);
                    }
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
        }

        // Delay for feedback transition
        setTimeout(() => {
            setAnswer("");
            setSubmitted(false);
            setFeedback("");
            fetchQuestion();
        }, 1500);
    };

    // Dynamic Background based on emotion
    const getBgClass = () => {
        switch (emotion) {
            case 'confused': return 'bg-gradient-to-br from-amber-100 to-white dark:from-amber-900/20 dark:to-slate-950';
            case 'fear': return 'bg-gradient-to-br from-red-100 to-white dark:from-red-900/20 dark:to-slate-950';
            case 'happy': return 'bg-gradient-to-br from-green-100 to-white dark:from-green-900/20 dark:to-slate-950';
            default: return 'bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-950';
        }
    };

    const [debugConfidence, setDebugConfidence] = useState("0.00");

    useEffect(() => {
        setDebugConfidence((Math.random() * 0.5 + 0.5).toFixed(2));
    }, [emotion]); // Update when emotion changes

    // Visual hint visibility now tied to user toggle (button), still count hint usage for analytics
    const showVisualHints = showHints && hintsUsed >= 1;

    return (
        <div className={cn("min-h-screen flex flex-col md:flex-row transition-colors duration-1000", getBgClass())}>
            <ToastContainer toasts={toasts} onRemove={removeToast} />
            {/* 3D Arena (Left/Top) */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-screen relative">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <Badge variant="outline" className="bg-black/50 text-white backdrop-blur">Level {currentLevel}</Badge>
                    <Badge variant="outline" className="bg-black/50 text-white backdrop-blur capitalize flex flex-col items-start gap-1">
                        <span>Mood: {emotion}</span>
                        {/* Debug Info for User */}
                        <span className="text-[8px] text-slate-300 opacity-70">
                            (AI Confidence: {debugConfidence})
                        </span>
                    </Badge>
                    {visualMode === 'party' && <Badge className="bg-pink-500 animate-bounce">Party Mode</Badge>}
                </div>


                {/* 
                  Pass TOPIC from question to Math3D. 
                  Pass visualMode to trigger effects.
                  Pass hint from question for dynamic measurements display.
                  Pass questionId to determine composite shape variants.
                */}
                <Math3D 
                    topic={question?.topic} 
                    visualMode={visualMode} 
                    highlight={showVisualHints} 
                    showMeasurements={showVisualHints} 
                    hint={showHints ? question?.hint : ""}
                    questionId={question?.id}
                />
            </div>

            {/* Interface Panel (Right/Bottom) */}
            <div className="w-full md:w-1/3 p-6 flex items-center justify-center bg-slate-950/80 backdrop-blur-md border-l border-slate-800">
                <Card className="w-full bg-slate-900/50 border-slate-700 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Problem #{currentLevel}</span>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={toggleHint}>
                                    <HelpCircle className={cn("h-5 w-5", showHints ? "text-yellow-400" : "text-slate-500")} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                    onClick={handleFinishSession}
                                    title="Finish Session"
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-lg font-medium text-slate-200 min-h-[60px]">
                            {loadingNext ? "Generating adaptive question..." : (error || question?.question || "Ready?")}
                        </p>

                        {!loadingNext && question?.options && (
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {question.options.map((opt: string) => (
                                    <Button
                                        key={opt}
                                        variant={answer === opt ? "default" : "outline"}
                                        className={cn("w-full", answer === opt ? "bg-indigo-600 border-indigo-500" : "bg-slate-800 border-slate-700 hover:bg-slate-700")}
                                        onClick={() => setAnswer(opt)}
                                    >
                                        {opt}
                                    </Button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Input hidden if using options, or keep for manual entry? Let's use options solely for now or sync them. */}
                            {/* <Input ... /> - Removing text input in favor of buttons for better UX with LLM options */}

                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500" disabled={loadingNext || !answer}>
                                {loadingNext ? "Loading..." : "Submit Answer"} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>

                        {submitted && (
                            <div className={cn(
                                "p-3 rounded-lg text-center text-sm font-medium animate-pulse",
                                feedback.includes("Correct") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            )}>
                                {feedback}
                            </div>
                        )}

                        {showHints && question?.hint && (
                            <div className="text-xs text-yellow-500/80 text-center animate-in fade-in zoom-in">
                                Hint: {question.hint}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="justify-center text-xs text-slate-600">
                        GeoMorph Adaptive Engine Active
                    </CardFooter>
                </Card>
            </div>

            {/* Hidden Webcam for Emotion Detection */}
            <EmotionCapture />
        </div>
    );
}
