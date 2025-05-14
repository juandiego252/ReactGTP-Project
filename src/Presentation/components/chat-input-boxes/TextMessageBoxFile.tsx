import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrushCleaning, FileAudio, Paperclip, Send } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";

interface Props {
    onSendMessage: (message: string, file: File) => void;
    placeholder: string;
    disableCorrections?: boolean;
    accept?: string;
}


export const TextMessageBoxFile = ({ onSendMessage, placeholder, accept }: Props) => {

    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) return;
        onSendMessage(message, selectedFile);
        setMessage("");
        setSelectedFile(null);
        if (inputFileRef.current) {
            inputFileRef.current.value = "";
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const clearFileSelection = () => {
        setSelectedFile(null);
        if (inputFileRef.current) {
            inputFileRef.current.value = "";
        }
    }


    return (
        <div className="flex flex-col w-full">
            <form
                onSubmit={handleSendMessage}
                className="rounded-xl bg-[#1e1e1e] w-full p-2"
            >
                {/* Combined input field and tools */}
                <div className="flex flex-col">
                    {/* Input field and send button */}
                    <div className="flex flex-row items-center">
                        <div className="flex-grow">
                            <div className="relative w-full">
                                <Input
                                    type="text"
                                    autoFocus
                                    name="message"
                                    className="flex w-full rounded-md bg-transparent pl-4 h-10 border-none focus:ring-0 focus:outline-none selection:bg-gray-700 selection:text-gray-200"
                                    placeholder={placeholder}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck={false}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <input
                                    type="file"
                                    ref={inputFileRef}
                                    accept={accept}
                                    onChange={handleFileChange}
                                    hidden
                                />
                            </div>
                        </div>
                        <div className="ml-2">
                            <Button type="submit" className="rounded-full p-2 h-10 w-10 bg-transparent hover:bg-[#414141]" disabled={!selectedFile}>
                                <Send size={20} color="#c2ff0d" />
                            </Button>
                        </div>
                    </div>

                    {/* Tools bar */}
                    <div className="flex flex-row gap-1 items-center mt-1">
                        <Button
                            type="button"
                            className="rounded-full p-2 h-8 w-8 bg-transparent hover:bg-[#414141]"
                            onClick={() => inputFileRef.current?.click()}
                            title="Seleccionar archivo"
                        >
                            <Paperclip size={16} color={selectedFile ? "#c2ff0d" : "currentColor"} />
                        </Button>
                        <Button
                            type="button"
                            className="rounded-full p-2 h-8 w-8 bg-transparent hover:bg-[#be5252]"
                            onClick={clearFileSelection}
                            disabled={!selectedFile}
                            title="Limpiar selección de archivo"
                        >
                            <BrushCleaning size={16} color={selectedFile ? "#ffffff" : "#555555"} />
                        </Button>
                        <span>
                            {
                                selectedFile ? (
                                    <div className="flex items-center px-2 py-1 bg-[#2a2a2a] rounded-full border border-[#3a3a3a] max-w-[350px]">
                                        <FileAudio size={16} color="#faba89" className="shrink-0 mr-2" />
                                        <span className="text-gray-200 text-sm truncate">
                                            {selectedFile.name}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500 text-sm italic">
                                        No file selected
                                    </span>
                                )
                            }
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

{/* <form
    onSubmit={handleSendMessage}
    className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
>

    <div className="mr-3">
        <button
            type="button"
            className="flex items-center justify-center text-gray-400 hover:text-gray-600"
            onClick={() => inputFileRef.current?.click()}
        >
            <i className="fa-solid fa-paperclip text-xl"></i>
        </button>
        <input
            type="file"
            ref={inputFileRef}
            accept={accept}
            onChange={(e) => setSelectedFile(e.target.files?.item(0))}
            hidden
        />
    </div>


    <div className="flex-grow">
        <div className="relative w-full">
            <input
                type="text"
                autoFocus
                name="message"
                className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-blue-500  pl-4 h-10  "
                placeholder={placeholder}
                autoComplete={disableCorrections ? "on" : "off"}
                autoCorrect={disableCorrections ? "on" : "off"}
                spellCheck={disableCorrections ? true : false}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
        </div>
    </div>
    <div className="ml-4">
        <button
            className="btn-primary"
            disabled={!selectedFile}
        >
            {
                (!selectedFile) ? <span className="mr-2">Enviar</span> : <span className="mr-2">{selectedFile.name.substring(0, 10) + '...'}</span>
            }
            <i className="fa-regular fa-paper-plane"></i>
        </button>
    </div>
</form>   */}