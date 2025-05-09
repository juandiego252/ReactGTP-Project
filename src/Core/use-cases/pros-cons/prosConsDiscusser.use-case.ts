import { ProsConsDiscusserResponse } from "../../../Interfaces/prosConsDiscusser.response";

export const prosConsDiscusserUseCase = async (prompt: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
            })
        });

        if (!response.ok) throw new Error('Error en la respuesta del servidor');

        const data = await response.json() as ProsConsDiscusserResponse;
        return {
            ok: true,
            ...data
        }
    } catch (error) {
        return {
            ok: false,
            content: '',
            role: 'user',
        }
    }
}