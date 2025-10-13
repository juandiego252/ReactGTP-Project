import Markdown from "react-markdown";
import ChatBubblePenguin from "../../../assets/ChatBubblePenguin.svg";

interface Props {
    text: string;
}

export const GptMessages = ({ text }: Props) => {
    return (
        <div className="col-start-1 col-end-12 sm:col-end-8 sm:p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full flex-shrink-0">
                    <img src={ChatBubblePenguin} alt="Gpt" className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="relative ml-2 sm:ml-3 sm:text-sm  bg-black/30 pt-2 sm:pt-3 pb-2 px-3 shadow rounded-xl break-words max-w-full overflow-hidden">
                    <Markdown>{text}</Markdown>
                </div>
            </div>
        </div>
    )
}
