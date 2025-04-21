import { useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBox, GptMessageImage } from "../../components";
import { ImageGenerationUseCase, ImageVariationUseCase } from "../../../Core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageTunningPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: 'http://localhost:3000/gpt/image-generation/1745268776108.png' as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariation = async () => {
    setIsLoading(true);
    const response = await ImageVariationUseCase(originalImageAndMask.original!);
    setIsLoading(false);

    if (!response) return;

    setMessages((prev) => [...prev, { text: 'Variacion', isGpt: true, info: { imageUrl: response.url, alt: response.alt } }])
  }

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
    <>
      {
        originalImageAndMask.original && (
          <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
            <span>Editando ...</span>
            <img
              className="border rounded-xl w-36 h-36 object-contain"
              src={originalImageAndMask.original}
              alt="Imagen Original"
            />
            <button
              className="btn-primary mt-2"
              onClick={handleVariation}
            >Generar variacion</button>
          </div>
        )
      }
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
    </>
  )
}
