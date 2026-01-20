"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Sun, Moon, Trash2, AlertTriangle, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLearningStore } from "@/lib/store";

interface UserInfo {
    full_name: string;
    email: string;
    role: string;
}

export default function SettingsPage() {
    const router = useRouter();
    const resetStore = useLearningStore((state) => state.resetSession);

    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDark, setIsDark] = useState(true);
    const [isPerformanceMode, setIsPerformanceMode] = useState(false);

    // Load generic settings (theme, performance) from local storage
    useEffect(() => {
        // Theme
        const isDarkMode = document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);

        // Performance
        const perf = localStorage.getItem("performance_mode") === "true";
        setIsPerformanceMode(perf);
    }, []);

    // Fetch User Info
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:8000/api/v1/auth/me", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (e) {
                console.error("Failed to fetch user", e);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Handlers
    const toggleTheme = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const togglePerformance = () => {
        const newVal = !isPerformanceMode;
        setIsPerformanceMode(newVal);
        localStorage.setItem("performance_mode", String(newVal));
        // You might listen to this in ThreeScene ideally, but for now just saving preference
    };

    const handleResetProgress = async () => {
        if (!confirm("⚠️ DANGER: Are you sure you want to delete ALL progress? This cannot be undone.")) {
            return;
        }

        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:8000/api/v1/session/reset", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                alert("Progress reset successfully! Redirecting...");
                resetStore();
                router.push("/dashboard");
            } else {
                alert("Failed to reset progress.");
            }
        } catch (e) {
            console.error("Reset failed", e);
            alert("Error connecting to server.");
        }
    };

    return (
        <div className="p-8 space-y-8 min-h-screen text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-transparent">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold font-heading text-slate-100">Settings</h2>
                <p className="text-slate-400 mt-2">Manage your account and preferences.</p>
            </div>

            <div className="grid gap-8 max-w-4xl">
                {/* Account Section */}
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-indigo-500" />
                            Account Information
                        </CardTitle>
                        <CardDescription>Your personal profile details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-slate-400">Full Name</Label>
                                <div className="font-medium text-lg">{user?.full_name || "Loading..."}</div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-slate-400">Email Address</Label>
                                <div className="font-medium text-lg">{user?.email || "Loading..."}</div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-slate-400">Role</Label>
                                <div className="font-medium text-lg capitalize">{user?.role || "Student"}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Preferences Section */}
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Cpu className="h-5 w-5 text-teal-500" />
                            App Preferences
                        </CardTitle>
                        <CardDescription>Customize your learning experience.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Dark Mode</Label>
                                <p className="text-sm text-slate-400">Enable immersive dark theme.</p>
                            </div>
                            <Button
                                variant={isDark ? "default" : "outline"}
                                size="sm"
                                onClick={toggleTheme}
                                className={isDark ? "bg-indigo-600" : "bg-white text-black hover:bg-zinc-200"}
                            >
                                {isDark ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                                {isDark ? "Dark" : "Light"}
                            </Button>
                        </div>
                        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Performance Mode</Label>
                                <p className="text-sm text-slate-400">Reduce 3D effects for older devices.</p>
                            </div>
                            <Switch
                                checked={isPerformanceMode}
                                onCheckedChange={togglePerformance}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="bg-red-950/20 border-red-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-500">
                            <AlertTriangle className="h-5 w-5" />
                            Danger Zone
                        </CardTitle>
                        <CardDescription className="text-red-400/60">Irreversible actions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base text-red-400">Reset Learning Progress</Label>
                                <p className="text-sm text-red-500/60">
                                    Deletes all sessions, stats, and achievements. You will start from Level 1.
                                </p>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={handleResetProgress}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Reset Everything
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
