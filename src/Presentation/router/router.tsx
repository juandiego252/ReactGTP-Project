import { createBrowserRouter, Navigate } from "react-router-dom";
import { ImageGenerationPage, ImageTunningPage, OrthographyPage, AudioToTextPage, AssistantPage } from "../pages";
import { TextToAudioPage } from "../pages/text-to-audio/TextToAudioPage";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Bot, FileMusic, Images, Podcast, SpellCheck, Wand } from "lucide-react";

export const menuRoutes = [
    {
        to: "/orthography",
        icon: <SpellCheck size={20} />,
        title: "Ortografía",
        description: "Corregir ortografía",
        component: <OrthographyPage />
    },
    {
        to: "/text-to-audio",
        icon: <Podcast size={20} />,
        title: "Texto a audio",
        description: "Convertir texto a audio",
        component: <TextToAudioPage />
    },
    {
        to: "/audio-to-text",
        icon: <FileMusic size={20} />,
        title: "Audio a texto",
        description: "Convertir audio a texto",
        component: <AudioToTextPage />
    },
    {
        to: "/image-generation",
        icon: <Images size={20} />,
        title: "Imágenes",
        description: "Generar imágenes",
        component: <ImageGenerationPage />
    },
    {
        to: "/image-tunning",
        icon: <Wand size={20} />,
        title: "Recrear Imagen",
        description: "Estudios de animación",
        component: <ImageTunningPage />
    },
    {
        to: "/assistant",
        icon: <Bot size={20} />,
        title: "Asistente",
        description: "Información del asistente",
        component: <AssistantPage />
    },
    // {
    //     to: "/pros-cons",
    //     icon: "fa-solid fa-code-compare",
    //     title: "Pros & Cons",
    //     description: "Comparar pros y contras",
    //     component: <ProsConsPage />
    // },
    // {
    //     to: "/pros-cons-stream",
    //     icon: "fa-solid fa-water",
    //     title: "Como stream",
    //     description: "Con stream de mensajes",
    //     component: <ProsConsStreamPage />
    // },
    // {
    //     to: "/translate",
    //     icon: "fa-solid fa-language",
    //     title: "Traducir",
    //     description: "Textos a otros idiomas",
    //     component: <TranslatePage />
    // },
];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            ...menuRoutes.map(route => ({
                path: route.to,
                element: route.component
            })),
            {
                path: '',
                element: <Navigate to={menuRoutes[0].to} />
            }
        ],
    }
])