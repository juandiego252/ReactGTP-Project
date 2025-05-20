import { OrthographyResponse } from "@/Interfaces";


export const orthographyUseCase = async (prompt: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
            })
        });

        if (!response.ok) throw new Error('Error en la respuesta del servidor');

        const data = await response.json() as OrthographyResponse;
        return {
            ok: true,
            ...data
        }

    } catch (error) {
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: 'No se pudo realizar la correción ortográfica',
        }
    }
}