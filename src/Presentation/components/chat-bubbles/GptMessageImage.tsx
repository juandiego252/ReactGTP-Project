import { Download } from "lucide-react";
import ChatBubblePenguin from "../../../assets/ChatBubblePenguin.svg";

interface Props {
    imageUrl: string;
    alt: string;
    onImageSelected?: (imageUrl: string) => void;
}

export const GptMessageImage = ({ onImageSelected, imageUrl, alt }: Props) => {

    const handleDownload = async (event: React.MouseEvent) => {
        event.stopPropagation();

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log('Error downloading image:', error);
            throw error;
        }
    }

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
                <button
                    className="flex items-center justify-center h-8 w-8 bg-gray-700/50 hover:bg-gray-600/70 rounded-full ml-2 cursor-pointer transition-colors duration-200"
                    title="Download Image"
                    onClick={handleDownload}
                >
                    <Download className="w-4 h-4 text-[#c2ff0d]" />
                </button>
            </div>
        </div>
    )
}
