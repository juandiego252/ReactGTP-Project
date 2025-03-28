import ChatBubblePenguin from "../../../assets/ChatBubblePenguin.svg";
interface Props {
    useScore: number;
    errors: string[];
    message: string;
}

export const GptOrthograpyMessage = ({ errors, message, useScore }: Props) => {
    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                    <img src={ChatBubblePenguin} alt="Gpt" className="w-10 h-10" />
                </div>
                <div className="relative ml-3 text-sm  bg-black/30 pt-3 pb-2 px-4 shadow rounded-xl">
                    <h3 className="text-3xl">Puntaje:{useScore}%</h3>
                    <p>{message}</p>
                    {
                        (errors.length === 0) ?
                            (<p>No se encontraron errores!</p>) :
                            (
                                <>
                                    <h3 className="text-2xl">Errores encontrados </h3>
                                    <ul>
                                        {
                                            errors.map((error, index) => (
                                                <li key={index}>
                                                    {error}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
