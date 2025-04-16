import { useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBox, GptMessageImage } from "../../components";
import { ImageGenerationUseCase } from "../../../Core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageGenerationPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // Todo Use case
    const imageInfo = await ImageGenerationUseCase(text);
    setIsLoading(false);

    if (!imageInfo) {
      return setMessages((prev) => [...prev, { text: 'No se pudo generar la imagen', isGpt: true }]);
    };

    setMessages(prev => [...prev,
    {
      text: text,
      isGpt: true,
      info: {
        imageUrl: imageInfo.url,
        alt: imageInfo.alt,
      },

    }])
    // Todo Añádor el mensaje de isGpt en true
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, dime que tipo de imagen quieres generar?" />
          {
            messages.map((messages, index) => (
              messages.isGpt ? (<GptMessageImage key={index} imageUrl={messages.info?.imageUrl!} alt={messages.info?.alt!} text={messages.text} />) : (<MyMessage key={index} text={messages.text} />)
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

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe tu texto aquí"
        disableCorrections={true}
      />

    </div>
  )
}
