
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, TrendingUp, Sparkles, Target, Brain, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer
} from "recharts";

// Types
interface EmotionStat {
    emotion: string;
    count: number;
    percentage: number;
}

interface AnalyticsSummary {
    total_sessions: number;
    total_questions: number;
    total_correct: number;
    overall_accuracy: number;
    current_level: number;
    emotions: EmotionStat[];
    topic_accuracy: { topic: string; accuracy: number }[];
}

// Emotion color mapping
const EMOTION_COLORS: Record<string, string> = {
    happy: "#22c55e",
    neutral: "#6366f1",
    sad: "#3b82f6",
    fear: "#f59e0b",
    angry: "#ef4444",
    disgust: "#8b5cf6",
    surprise: "#ec4899"
};

export default function DashboardPage() {
    const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:8000/api/v1/analytics/summary", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.log("Analytics fetch error:", error);
        }
    };

    // Default data if no analytics
    const emotionData = analytics?.emotions?.length
        ? analytics.emotions.map(e => ({ name: e.emotion, value: e.percentage }))
        : [
            { name: "happy", value: 40 },
            { name: "neutral", value: 35 },
            { name: "fear", value: 15 },
            { name: "sad", value: 10 }
        ];

    const topicData = analytics?.topic_accuracy?.length
        ? analytics.topic_accuracy.map(t => ({ name: t.topic, accuracy: t.accuracy }))
        : [
            { name: "Cube", accuracy: 85 },
            { name: "Cylinder", accuracy: 72 },
            { name: "Sphere", accuracy: 68 },
            { name: "Cone", accuracy: 55 }
        ];

    return (
        <div className="p-8 space-y-8 bg-slate-950 min-h-screen text-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-heading">GeoMorph Dashboard</h2>
                    <p className="text-slate-400">
                        Welcome back! Level {analytics?.current_level || 1} - {analytics?.overall_accuracy || 0}% Accuracy
                    </p>
                </div>
                <Link href="/learn">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20">
                        <PlayCircle className="mr-2 h-5 w-5" /> Start Learning
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                            <Target className="h-4 w-4 text-indigo-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-indigo-400">
                                Level {analytics?.current_level || 1}
                            </div>
                            <p className="text-xs text-slate-500">Keep going!</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-400">
                                {analytics?.overall_accuracy || 0}%
                            </div>
                            <p className="text-xs text-slate-500">
                                {analytics?.total_correct || 0}/{analytics?.total_questions || 0} correct
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                            <Brain className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-400">
                                {analytics?.total_sessions || 0}
                            </div>
                            <p className="text-xs text-slate-500">Total learning sessions</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 border-indigo-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white">Questions</CardTitle>
                            <Zap className="h-4 w-4 text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">
                                {analytics?.total_questions || 0}
                            </div>
                            <p className="text-xs text-indigo-200">Problems solved</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Emotion Distribution */}
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-yellow-500" />
                            Emotion Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={emotionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}%`}
                                    >
                                        {emotionData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={EMOTION_COLORS[entry.name] || "#6366f1"}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: '1px solid #334155',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Topic Accuracy */}
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            Accuracy by Topic
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topicData} layout="vertical">
                                    <XAxis type="number" domain={[0, 100]} stroke="#64748b" />
                                    <YAxis dataKey="name" type="category" width={80} stroke="#64748b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: '1px solid #334155',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value) => [`${value}%`, 'Accuracy']}
                                    />
                                    <Bar
                                        dataKey="accuracy"
                                        fill="#22c55e"
                                        radius={[0, 4, 4, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Tips */}
            <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                    <CardTitle>Learning Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-4 bg-slate-800/50 rounded-lg">
                            <h4 className="font-semibold text-green-400 mb-2">Stay Happy!</h4>
                            <p className="text-sm text-slate-400">
                                Positive emotions help you level up faster. Smile while learning!
                            </p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-lg">
                            <h4 className="font-semibold text-indigo-400 mb-2">Take Your Time</h4>
                            <p className="text-sm text-slate-400">
                                Rushing causes mistakes. Think carefully before answering.
                            </p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-lg">
                            <h4 className="font-semibold text-yellow-400 mb-2">Use Hints</h4>
                            <p className="text-sm text-slate-400">
                                Stuck? Click the hint button. Learning is more important than score!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
