import { useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBoxFileSelect, GptMessageImage } from "../../components";
import { ImageStudiosCase } from "../../../Core/use-cases";

const studios = [
  { id: "1", text: "Studio Ghibli" },
  { id: "2", text: "Toei Animation" },
  { id: "3", text: "MAPPA" },
  { id: "4", text: "Madhouse" },
  { id: "5", text: "Pixar Animation Studios" },
  { id: "6", text: "Walt Disney Animation Studios" },
  { id: "7", text: "Illumination" },
  { id: "8", text: "Family Guy" },
  { id: "9", text: "The Simpsons" },
  { id: "10", text: "DreamWorks Animation" },
]

interface Message {
  text?: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageTunningPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (studioId: string, imageFile: File) => {
    setIsLoading(true);

    const selectedStudio = studios.find(studio => studio.id === studioId);
    const studioName = selectedStudio ? selectedStudio.text : 'Toei Animation';
    setMessages((prev) => [...prev, { text: studioName, isGpt: false }]);

    // Todo Use case
    const response = await ImageStudiosCase(imageFile, studioName);
    setIsLoading(false);
    if (!response) {
      return setMessages((prev) => [...prev, { text: 'No se pudo generar la imagen', isGpt: true }]);

    }
    // Todo Añádor el mensaje de isGpt en true
    setMessages((prev) => [...prev, {
      text: `Imagen rediseñada al estilo ${studioName}`,
      isGpt: true,
      info: {
        imageUrl: response.url,
        alt: response.alt || 'Imagen rediseñada',
      }
    }])
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, sube tu imagen y selecciona el estudio de animacion con el cual quieres rediseñar la imagen" />
          {
            messages.map((message, index) => (
              message.isGpt
                ? (message.info?.imageUrl
                  ? <GptMessageImage key={index}
                    imageUrl={message.info.imageUrl}
                    alt={message.info.alt}
                  />
                  : <GptMessages key={index} text={message.text || ''} />
                )
                : <MyMessage key={index} text={message.text || 'Imagen enviada'} />
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

      <TextMessageBoxFileSelect
        accept="image/*"
        onSendMessage={handlePost}
        options={studios}

      />

    </div>
  )
}
