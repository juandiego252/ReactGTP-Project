import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

interface Props {
    onSendMessage: (message: string) => void;
    placeholder: string;
}

export const TextMessageBox = ({ onSendMessage, placeholder }: Props) => {

    const [message, setMessage] = useState("");

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim().length === 0) return;
        onSendMessage(message);
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
                            </div>
                        </div>
                        <div className="ml-2">
                            <Button type="submit" className="rounded-full p-2 h-10 w-10 bg-transparent hover:bg-[#414141]" onClick={() => handleSendMessage}>
                                <Send size={20} color="#c2ff0d" />
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

