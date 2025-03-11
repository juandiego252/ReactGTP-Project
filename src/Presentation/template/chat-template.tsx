import { useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBox } from "../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async(text:string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, {text: text, isGpt: false}]);

    // Todo Use case
    setIsLoading(false);
    // Todo Añádor el mensaje de isGpt en true
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, escribe tu texto en español y comenzaré con las correcciones." />
          {
            messages.map((messages, index) => (
              messages.isGpt ? (<GptMessages key={index} text="Esto es de OpenIA" />) : (<MyMessage key={index} text={messages.text} />)
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
