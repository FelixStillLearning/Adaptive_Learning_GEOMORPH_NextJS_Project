
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThreeScene from "@/components/ThreeScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit, Loader2, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:8000/api/v1/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    full_name: fullName,
                    role: role,
                    is_active: true
                }),
            });

            if (res.ok) {
                // Auto login or redirect to login
                router.push("/");
            } else {
                const data = await res.json();
                setError(data.detail || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <ThreeScene />

            {/* Glass Panel Register Form */}
            <Card className="glass-panel w-full max-w-md mx-4 border-slate-700/50 bg-slate-900/50 text-slate-100 shadow-2xl backdrop-blur-xl relative z-10">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center ring-1 ring-indigo-500/50">
                            <BrainCircuit className="h-8 w-8 text-indigo-400" />
                        </div>
                    </div>
                    <CardTitle className=" text-2xl font-bold tracking-tight font-heading">Join GeoMorph</CardTitle>
                    <CardDescription className="text-slate-400">
                        Create an account to start your journey
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input
                                id="fullname"
                                placeholder="Felix Developer"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="bg-slate-950/50 border-slate-800 text-slate-100 focus:ring-indigo-500/50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="felix@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-slate-950/50 border-slate-800 text-slate-100 focus:ring-indigo-500/50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-slate-950/50 border-slate-800 text-slate-100 focus:ring-indigo-500/50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>I am a...</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger className="bg-slate-950/50 border-slate-800 text-slate-100">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
