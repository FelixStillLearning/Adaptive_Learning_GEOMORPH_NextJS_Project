
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThreeScene from "@/components/ThreeScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous error

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const res = await fetch("http://localhost:8000/api/v1/auth/token", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.access_token);
        }
        setLoading(false);
        router.push("/dashboard");
      } else {
        const errorData = await res.json().catch(() => ({ detail: "Login failed" }));
        setError(errorData.detail || "Email atau password salah. Silakan coba lagi.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan. Pastikan server backend sudah running.");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <ThreeScene />

      {/* Glass Panel Login Form */}
      <Card className="glass-panel w-full max-w-md mx-4 border-slate-700/50 bg-slate-900/50 text-slate-100 shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center ring-1 ring-indigo-500/50">
              <BrainCircuit className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <CardTitle className=" text-2xl font-bold tracking-tight font-heading">Welcome to GeoMorph</CardTitle>
          <CardDescription className="text-slate-400">
            Sign in to continue your adaptive learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="felix@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-950/50 border-slate-800 text-slate-100 focus:ring-indigo-500/50"
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
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
            </Button>
            <div className="text-center text-sm text-slate-400 mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Register
              </Link>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-xs text-slate-500">
          Protected by AI-Enhanced Security
        </CardFooter>
      </Card>
    </main>
  );
}
