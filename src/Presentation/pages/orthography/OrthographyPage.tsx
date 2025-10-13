import { useEffect, useState } from "react";
import { GptMessages, GptOrthograpyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { orthographyUseCase } from "../../../Core/use-cases";
import { useChatContext } from "@/context/ChatProvider";
import { useLocation } from "react-router-dom";


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}

export const OrthographyPage = () => {

  const location = useLocation();
  const { getConversation, setConversation } = useChatContext();
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => getConversation(location.pathname));


  // Cargar conversación al montar el componente
  useEffect(() => {
    const savedMessages = getConversation(location.pathname);
    setMessages(savedMessages);
  }, [location.pathname]);

  // Guardar conversación cada vez que cambian los mensajes
  useEffect(() => {
    setConversation(location.pathname, messages)
  }, [messages, location.pathname]);


  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, message, errors, userScore } = await orthographyUseCase(text);
    if (!ok) {
      setMessages((prev) => [...prev, { text: 'No se pudo realizar la correción', isGpt: true }]);
    } else {
      setMessages((prev) => [...prev, {
        text: message,
        isGpt: true,
        info: {
          userScore,
          errors,
          message,
        }
      }]);
    }
    setIsLoading(false);
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, escribe tu texto en español y comenzaré con las correcciones." />
          {
            messages.map((message, index) => (
              message.isGpt ? (
                message.info ? (
                  <GptOrthograpyMessage
                    key={index}
                    errors={message.info.errors}
                    message={message.info.message}
                    useScore={message.info.userScore}
                  />
                ) : (
                  <GptMessages key={index} text={message.text} />
                )
              ) : (<MyMessage key={index} text={message.text} />)
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
      />
    </div>
  )
}
