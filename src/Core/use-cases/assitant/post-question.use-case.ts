import { QuestionResponse } from "../../../Interfaces";

export const postQuestionUseCase = async (threadId: string, question: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_ASSITANT_API}/user-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId: threadId,
                question: question,
            })
        });
        const replies = await response.json() as QuestionResponse[];
        return replies;
    } catch (error) {
        throw new Error('Error en la pregunta');
    }
}