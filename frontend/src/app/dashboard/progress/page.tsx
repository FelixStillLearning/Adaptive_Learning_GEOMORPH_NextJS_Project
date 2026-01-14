"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, Shapes, Sigma, Cylinder } from "lucide-react";

interface VideoResource {
    title: string;
    url: string;
}

interface TopicCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    videos: VideoResource[];
}

const resources: TopicCategory[] = [
    {
        id: "flat-shapes",
        title: "1. Bangun Ruang Sisi Datar",
        icon: <Shapes className="h-5 w-5 text-indigo-500" />,
        videos: [
            { title: "Kubus", url: "https://www.youtube.com/embed/X4iZvxQHoCs" },
            { title: "Balok", url: "https://www.youtube.com/embed/ZF9BEPhAAUg" },
            { title: "Prisma", url: "https://www.youtube.com/embed/SVxQD44Eu_A" },
            { title: "Limas", url: "https://www.youtube.com/embed/HosMv67Rtlw" }
        ]
    },
    {
        id: "curved-shapes",
        title: "2. Bangun Ruang Sisi Lengkung",
        icon: <Cylinder className="h-5 w-5 text-green-500" />,
        videos: [
            { title: "Tabung", url: "https://www.youtube.com/embed/xNZ-sDrQlXg" },
            { title: "Kerucut", url: "https://www.youtube.com/embed/9MlpMg-KzM4" },
            { title: "Bola", url: "https://www.youtube.com/embed/ZM1_m6VjNJk" }
        ]
    },
    {
        id: "calculus",
        title: "3. Kalkulus",
        icon: <Sigma className="h-5 w-5 text-purple-500" />,
        videos: [
            { title: "Turunan", url: "https://www.youtube.com/embed/sruoxJ0NarI" },
            { title: "Integral", url: "https://www.youtube.com/embed/n9NCTTu0GVo" }
        ]
    }
];

export default function MaterialsPage() {
    return (
        <div className="p-8 space-y-8 bg-slate-950 min-h-screen text-slate-100">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3">
                    <PlayCircle className="h-8 w-8 text-indigo-500" />
                    Material Library
                </h2>
                <p className="text-slate-400 mt-2">
                    Access curated video tutorials to master geometry and calculus concepts.
                </p>
            </div>

            {/* Video Accordion */}
            <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                    <CardTitle>Video Resources</CardTitle>
                    <CardDescription>Select a topic to view available tutorials</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {resources.map((category) => (
                            <AccordionItem key={category.id} value={category.id} className="border-slate-800">
                                <AccordionTrigger className="hover:no-underline hover:bg-slate-800/50 px-4 rounded-lg transition-all">
                                    <div className="flex items-center gap-3 text-lg font-semibold text-slate-200">
                                        {category.icon}
                                        {category.title}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pt-4 pb-6 bg-slate-950/30">
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                        {category.videos.map((video, idx) => (
                                            <div key={idx} className="space-y-3 group">
                                                <div className="aspect-video rounded-xl overflow-hidden bg-slate-800 relative shadow-lg ring-1 ring-white/10 group-hover:ring-indigo-500/50 transition-all">
                                                    <iframe
                                                        className="w-full h-full"
                                                        src={video.url}
                                                        title={video.title}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                                    <h4 className="font-medium text-slate-300 group-hover:text-indigo-400 transition-colors">
                                                        {video.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
