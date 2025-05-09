import type { AudioToTextResponse } from "../../../Interfaces";

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
    try {
        const formData = new FormData();
        formData.append('file', audioFile);
        if (prompt) {
            formData.append('prompt', prompt);
        }
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Error en la respuesta del servidor');

        const data = await response.json() as AudioToTextResponse;
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}