import { useRef, useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { prosConsDiscusserStreamGeneratorUseCase } from "../../../Core/use-cases";
import { GptProsConsDiscusser } from "../../components/chat-bubbles/GptProsConsDiscusser";


interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunnig = useRef(false);


  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    if (isRunnig.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }
    setIsLoading(true);
    isRunnig.current = true;
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // // Todo Use case
    const stream = prosConsDiscusserStreamGeneratorUseCase(text, abortController.current.signal);
    setIsLoading(false);
    setMessages((messages) => [...messages, { text: '', isGpt: true }]);
    for await (const text of stream) {
      setMessages((messages) => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }
    isRunnig.current = false;
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="¿Qué desea comparar hoy?" />
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
