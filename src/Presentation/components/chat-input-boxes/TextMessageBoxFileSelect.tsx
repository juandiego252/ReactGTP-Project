import { FormEvent, useRef, useState } from "react";

interface Props {
    onSendMessage: (message: string, file: File) => void;
    accept?: string;
    options?: Option[];
    placeholder?: string;
}

interface Option {
    id: string;
    text: string;
}

export const TextMessageBoxFileSelect = ({
    onSendMessage,
    accept,
    options,
    placeholder = "Seleccionar opción"
}: Props) => {

    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) return;
        onSendMessage(message, selectedFile);
        setMessage("");
        setSelectedFile(null);
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-col sm:flex-row items-center rounded-xl bg-white w-full p-4 gap-3 shadow-sm border border-gray-200"
        >
            <div
                className={`w-full sm:w-auto flex flex-col items-center justify-center p-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                    ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                    ${selectedFile ? 'bg-green-50 border-green-300' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => inputFileRef.current?.click()}
            >
                <div className="flex flex-col items-center justify-center">
                    <i className={`${selectedFile ? 'fa-solid fa-check text-green-500' : 'fa-solid fa-cloud-arrow-up text-gray-400'} text-xl mb-2`}></i>
                    <span className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : "Seleccionar o arrastrar imagen"}
                    </span>
                    {selectedFile && (
                        <button
                            type="button"
                            className="text-xs text-red-500 mt-1 hover:text-red-700"
                            onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                        >
                            Eliminar
                        </button>
                    )}
                </div>
                <input
                    type="file"
                    ref={inputFileRef}
                    accept={accept}
                    onChange={(e) => setSelectedFile(e.target.files?.item(0) || null)}
                    hidden
                    aria-label="Seleccionar archivo"
                />
            </div>

            <div className="flex-grow w-full">
                <div className="relative w-full">
                    <select
                        name="Seleccionar Estudio"
                        className="w-full border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 h-12 transition-all bg-gray-50"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        aria-label="Seleccionar estudio"
                        required={selectedFile != null}
                    >
                        <option value=''>{placeholder}</option>
                        {options?.map(({ id, text }) => (
                            <option key={id} value={id}>{text}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <button
                    type="submit"
                    className={`w-full sm:w-auto py-3 px-4 rounded-lg flex items-center justify-center transition-colors ${!selectedFile
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    disabled={!selectedFile}
                >
                    <span className="mr-2">Enviar</span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </form>
    );
};