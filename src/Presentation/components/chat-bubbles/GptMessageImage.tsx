import ChatBubblePenguin from "../../../assets/ChatBubblePenguin.svg";

interface Props {
    text: string;
    imageUrl: string;
    alt: string;
}

export const GptMessageImage = ({ text, imageUrl, alt }: Props) => {
    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                    <img src={ChatBubblePenguin} alt="Gpt" className="w-10 h-10" />
                </div>
                <span>{text}</span>
                <div className="relative ml-3 text-sm  bg-black/30 pt-3 pb-2 px-4 shadow rounded-xl">
                    <img src={imageUrl} alt={alt} className="rounded-xl w-96 h-96 object-cover" />
                </div>
            </div>
        </div>
    )
}
