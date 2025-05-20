import { FileAudio } from "lucide-react";

interface Props {
    text: string;
    audioFileName?: string;
}

export const MyMessage = ({ text, audioFileName }: Props) => {
    return (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-[#c2ff0d] flex-shrink-0 border-2 border-neutral-600/90">
                    G
                </div>
                <div className="relative mr-3 text-sm  bg-neutral-600/90 py-2  px-4 shadow rounded-xl">
                    <div>{text}</div>
                    {
                        audioFileName && (
                            <div className="mt-2">
                                <div className="flex items-center px-2 py-1 bg-[#2a2a2a] rounded-full border border-[#3a3a3a] max-w-[350px]">
                                    <FileAudio size={16} color="#faba89" className="shrink-0 mr-2" />
                                    <span className="text-gray-200 text-sm truncate">
                                        {audioFileName}
                                    </span>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}
