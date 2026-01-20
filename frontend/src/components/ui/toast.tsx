"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, X } from "lucide-react";

interface ToastProps {
    message: string;
    type: "levelUp" | "levelDown" | "info";
    onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={cn(
                "fixed top-4 right-4 z-50 transition-all duration-300 transform",
                isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}
        >
            <div
                className={cn(
                    "flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-xl border min-w-[300px]",
                    type === "levelUp" && "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-teal-400/50 text-teal-100",
                    type === "levelDown" && "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 text-purple-100",
                    type === "info" && "bg-slate-900/70 border-slate-500/50 text-slate-100"
                )}
            >
                {type === "levelUp" && (
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-500/30 rounded-lg flex items-center justify-center border border-teal-400/30">
                        <ArrowUp className="w-5 h-5 text-teal-300" strokeWidth={2.5} />
                    </div>
                )}
                {type === "levelDown" && (
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center border border-purple-400/30">
                        <ArrowDown className="w-5 h-5 text-purple-300" strokeWidth={2.5} />
                    </div>
                )}
                
                <div className="flex-1">
                    <p className="font-bold text-sm tracking-wide">
                        {type === "levelUp" && "LEVEL UP"}
                        {type === "levelDown" && "LEVEL DOWN"}
                        {type === "info" && "INFO"}
                    </p>
                    <p className="text-xs font-mono opacity-90">{message}</p>
                </div>

                <button
                    onClick={handleClose}
                    className="flex-shrink-0 w-6 h-6 hover:bg-white/10 rounded-md flex items-center justify-center transition-colors"
                >
                    <X className="w-3.5 h-3.5 opacity-70" />
                </button>
            </div>
        </div>
    );
}

interface ToastContainerProps {
    toasts: Array<{ id: string; message: string; type: "levelUp" | "levelDown" | "info" }>;
    onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    return (
        <>
            {toasts.map((toast, index) => (
                <div key={toast.id} style={{ top: `${index * 90 + 16}px` }} className="absolute">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => onRemove(toast.id)}
                    />
                </div>
            ))}
        </>
    );
}
