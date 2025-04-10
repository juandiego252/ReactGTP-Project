import { TranslateResponse } from "../../Interfaces";

export const translateUseCase = async (prompt: string, lang: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                lang: lang,
            })
        });
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const { message } = await response.json() as TranslateResponse;
        return {
            ok: true,
            message: message,
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error in translateUseCase',
        }
    }
}