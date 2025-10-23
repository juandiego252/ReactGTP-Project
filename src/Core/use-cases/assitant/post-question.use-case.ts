// import { QuestionResponse } from "../../../Interfaces";

interface BackendResponse {
    message: {
        role: string;
        content: string;
    };
    threadId: string;
}

export const postQuestionUseCase = async (threadId: string, question: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_ASSITANT_API}/user-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId,
                question
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
            throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo realizar la consulta'}`);
        }

        const data = await response.json() as BackendResponse;

        if (!data || !data.message) {
            throw new Error('No se recibió respuesta del servidor');
        }

        // Convertir la respuesta del backend al formato esperado
        return [{
            role: data.message.role,
            content: [data.message.content]
        }];

    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
        }
        throw error;
    }
}