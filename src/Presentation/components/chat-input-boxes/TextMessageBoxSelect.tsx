import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

interface Props {
    onSendMessage: (message: string, selectedOption: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
    options: Option[];
}

interface Option {
    id: string;
    text: string;
}


export const TextMessageBoxSelect = ({ onSendMessage, placeholder, options }: Props) => {

    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState<string>('');


    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim().length === 0) return;
        if (selectedOption.trim() === '') return;
        onSendMessage(message, selectedOption);
        setMessage("");
    };

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
                            <div className="flex-grow flex space-x-2">
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
                                <Select
                                    name="select"
                                    value={selectedOption}
                                    onValueChange={(value) => setSelectedOption(value)}

                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Voz" />
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
                            </div>
                        </div>
                        <div className="ml-2">
                            <Button type="submit" className="rounded-full p-2 h-10 w-10 bg-transparent hover:bg-[#414141]">
                                <Send size={20} color="#c2ff0d" />
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}