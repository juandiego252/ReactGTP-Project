import { useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBoxFile } from "../../components";
import { audioToTextUseCase } from "../../../Core/use-cases";


interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // Todo Use case
    const response = await audioToTextUseCase(audioFile, text);
    setIsLoading(false);

    if (!response) return;
    const gptMessage = `
## Transcripción de audio a texto:
**Duración:** ${Math.round(response.duration)} segundos

## Texto:
${response.text}
`;
    setMessages((prev) => [...prev, { text: gptMessage, isGpt: true }])
    // Todo Añádor el mensaje de isGpt en true
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, sube tu audio y comenzare a convertirlo en texto" />
          {
            messages.map((messages, index) => (
              messages.isGpt ? (<GptMessages key={index} text={messages.text} />) : (<MyMessage key={index} text={messages.text ? '' : 'Transcribe el audio'} />)
            ))
          }
          {
            isloading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader className="fade-in" />
              </div>
            )
          }
        </div>
      </div>

      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe tu texto aquí"
        disableCorrections={true}
        accept="audio/*"
      />

    </div>
  )
}
