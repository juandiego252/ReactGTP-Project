export const createThreadUseCase = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_ASSITANT_API}/create-thread`, {
            method: 'POST'
        });

        const { id } = await response.json() as { id: string };
        return id;
    } catch (error) {
        throw new Error('Error en la creación del hilo');
    }
}