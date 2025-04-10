import { useState } from "react";
import { GptMessages, MyMessage, TextMessageBoxSelect, TypingLoader } from "../../components";
import { translateUseCase } from "../../../Core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}
const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];
export const TranslatePage = () => {
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);
    // const newMessage = `Traduce: ${text} al idioma ${selectedOption}`;
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);
    const { ok, message } = await translateUseCase(text, selectedOption);
    setIsLoading(false);
    if (!ok) {
      return alert(message);
    }
    setMessages((prev) => [...prev, { text: message, isGpt: true }]);

    // Todo Use case
    // Todo Añádor el mensaje de isGpt en true
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, escribe tu texto y cciona el idioma para comenzar con la traduccion!" />
          {
            messages.map((messages, index) => (
              messages.isGpt ? (<GptMessages key={index} text={messages.text} />) : (<MyMessage key={index} text={messages.text} />)
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

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe tu texto aquí"
        options={languages}
      />

    </div>
  )
}
