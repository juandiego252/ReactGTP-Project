import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrushCleaning, Image, Paperclip, Send } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

interface Props {
    onSendMessage: (selectedOption: string, file: File) => void;
    accept?: string;
    options: Option[];
}

interface Option {
    id: string;
    text: string;
}

export const TextMessageBoxFileSelect = ({ onSendMessage, options, accept }: Props) => {


    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [selectedOption, setSelectedOption] = useState<string>('');
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) return;
        if (selectedOption.trim() === '') return;
        onSendMessage(selectedOption, selectedFile);
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
                                <Select
                                    name="select"
                                    value={selectedOption}
                                    onValueChange={(value) => setSelectedOption(value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Estudios" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                options.map(({ id, text }) => (
                                                    <SelectItem key={id} value={id}>
                                                        {text}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
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
                                        <Image size={16} color="#faba89" className="shrink-0 mr-2" />
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
    );
};
