import { useEffect, useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBoxFile } from "../../components";
import { audioToTextUseCase } from "../../../Core/use-cases";
import { useChatContext } from "@/context/ChatProvider";


interface Message {
  text: string;
  isGpt: boolean;
  audioFileName?: string;
}
const disclaimer = "El formato de audio debe ser .mp3 / .mp4";
export const AudioToTextPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const conversationKey = 'audio-to-text';
  const { getConversation, setConversation } = useChatContext();

  useEffect(() => {
    const savedMessage = getConversation(conversationKey);
    if (savedMessage && savedMessage.length) {
      setMessages(savedMessage as Message[]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setConversation(conversationKey, messages);
    }
  }, [messages]);



  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev,
    {
      text: text || 'Transcribe el audio',
      isGpt: false,
      audioFileName: audioFile.name
    }
    ]);

    // Todo Use case
    const response = await audioToTextUseCase(audioFile, text);
    setIsLoading(false);

    if (!response) return;
    const gptMessage = `
## Transcripción de audio a texto
**Duración:** ${Math.round(response.duration)} segundos

## Texto:
${response.text}
`;
    setMessages((prev) => [...prev, { text: gptMessage, isGpt: true }])
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <span className="flex justify-center items-center">{`Atención: ${disclaimer}`}</span>
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, sube tu audio y comenzare a convertirlo en texto" />
          {
            messages.map((messages, index) => (
              messages.isGpt ? (
                <GptMessages key={index} text={messages.text} />
              ) : (
                <MyMessage
                  key={index}
                  text={messages.text || 'Transcribe el audio'}
                  audioFileName={messages.audioFileName}
                />)
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
