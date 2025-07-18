export async function* prosConsDiscusserStreamGeneratorUseCase(prompt: string, abortSignal: AbortSignal) {
    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
            }),
            // Todo: abortSignal
            signal: abortSignal,

        });

        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const reader = response.body?.getReader();
        if (!reader) {
            console.log('No se pudo generar el reader');
            return null;
        }
        const decoder = new TextDecoder();
        let text = '';
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const decodedChunk = decoder.decode(value, { stream: true });
            text += decodedChunk;
            yield text;
        }

    } catch (error) {
        console.log('Error en el stream', error);
        return null;
    }
}