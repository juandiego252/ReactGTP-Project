export const ImageStudiosCase = async (imageFile: File, studio: string) => {
    try {
        const formData = new FormData();
        formData.append('file', imageFile);
        if (studio) {
            formData.append('prompt', studio);
        }
        const response = await fetch(`${import.meta.env.VITE_GPT_API}/image-studios-generation`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        console.log({ data });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}