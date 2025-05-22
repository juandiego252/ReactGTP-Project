import { ImageStudioResponse } from "@/Interfaces";

type GeneratedImage = Image | null;

interface Image {
    url: string;
    alt: string;
}

export const ImageStudiosCase = async (imageFile: File, studio: string): Promise<GeneratedImage> => {
    try {
        const formData = new FormData();
        formData.append('file', imageFile);
        if (studio) {
            formData.append('studio', studio);
        }
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/image-studios-generation`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json() as ImageStudioResponse;
        console.log({ data });
        return {
            url: data.url,
            alt: data.fileName,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}