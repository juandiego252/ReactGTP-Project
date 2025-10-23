

export const textToAudioUseCase = async (prompt: string, voice: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/text-to-audio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                voice: voice,
            })
        });

        if (!response.ok) throw new Error('No se pudo realizar la generación de audio');

        const data = await response.json();
        // const audioUrl = URL.createObjectURL(audioFile);

        return {
            ok: true,
            message: prompt,
            audioUrl: data.azureUrl,
            fileName: data.fileName
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Error al generar el audio',
        }
    }
}