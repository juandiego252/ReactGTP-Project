import Markdown from "react-markdown";
import ChatBubblePenguin from "../../../assets/ChatBubblePenguin.svg";
interface Props {
    content: string;
    role?: string;
}

export const GptProsConsDiscusser = ({ content }: Props) => {
    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                    <img src={ChatBubblePenguin} alt="Gpt" className="w-10 h-10" />
                </div>
                <div className="relative ml-3 text-sm  bg-black/30 pt-3 pb-2 px-4 shadow rounded-xl">
                    <Markdown>{content}</Markdown>
                </div>
            </div>
        </div>
    )
}
