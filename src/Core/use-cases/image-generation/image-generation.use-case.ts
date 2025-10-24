
type GeneratedImage = Image | null;

interface Image {
    url: string;
    alt: string;
}


export const ImageGenerationUseCase = async (prompt: string, originalImage?: string, maskImage?: string): Promise<GeneratedImage> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                originalImage,
                maskImage
            })
        });

        const data = await response.json();
        return {
            url: data.azureUlr,
            alt: data.revised_prompt

        };
    } catch (error) {
        return null;
    }
}
