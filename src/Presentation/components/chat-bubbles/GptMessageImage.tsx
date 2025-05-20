import { Download } from "lucide-react";
import ChatBubblePenguin from "../../../assets/ChatBubblePenguin.svg";

interface Props {
    imageUrl: string;
    alt: string;
    onImageSelected?: (imageUrl: string) => void;
}

export const GptMessageImage = ({ onImageSelected, imageUrl, alt }: Props) => {
    const downloadUrl = `${import.meta.env.VITE_GPT_API}/download-image?url=${encodeURIComponent(imageUrl)}`;
    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                    <img src={ChatBubblePenguin} alt="Gpt" className="w-10 h-10" />
                </div>
                <div className="relative ml-3 text-sm  bg-black/30 pt-3 pb-2 px-4 shadow rounded-xl">
                    <img
                        src={imageUrl}
                        alt={alt}
                        className="rounded-xl w-96 h-96 object-cover"
                        onClick={() => onImageSelected && onImageSelected(imageUrl)} />
                </div>
                <a
                    href={downloadUrl}
                    download={`image-${new Date().getTime()}`}
                    className="flex items-center justify-center h-8 w-8 bg-gray-700/50 hover:bg-gray-600/70 rounded-full ml-2 cursor-pointer transition-colors duration-200"
                    title="Download Image"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Download className="w-4 h-4 text-[#c2ff0d]" />
                </a>
            </div>
        </div>
    )
}
