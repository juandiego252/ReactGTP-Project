import { useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { prosConsDiscusserUseCase } from "../../../Core/use-cases";
import { GptProsConsDiscusser } from "../../components/chat-bubbles/GptProsConsDiscusser";

interface Message {
  text: string;
  isGpt: boolean;

}

export const ProsConsPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);
    const { ok, content, role } = await prosConsDiscusserUseCase(text);

    if (!ok) {
      setMessages((prev) => [...prev, { text: 'No se pudo realizar las comparaciones', isGpt: true }]);
    } else {
      setMessages((prev) => [...prev, {
        text: content,
        role: role,
        isGpt: true,
      }])
    }
    // Todo Use case
    setIsLoading(false);
    // Todo Añádor el mensaje de isGpt en true
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, escribe las comparaciones que necesites y te daré mi punto de vista" />
          {
            messages.map((messages, index) => (
              messages.isGpt ? (
                <GptProsConsDiscusser
                  key={index}
                  content={messages.text}
                />
              ) : (
                <MyMessage key={index} text={messages.text} />
              )
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
