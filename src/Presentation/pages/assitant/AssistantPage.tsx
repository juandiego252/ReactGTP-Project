import { useEffect, useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { createThreadUseCase, postQuestionUseCase } from "../../../Core/use-cases";


interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string>();

  // Obtener el thread y si no existe crear uno nuevo
  useEffect(() => {
    const threadId = localStorage.getItem('threadId');
    if (threadId) {
      setThreadId(threadId);
    } else {
      createThreadUseCase().then((id) => {
        setThreadId(id);
        localStorage.setItem('threadId', id);
      });
    }
  }, []);

  useEffect(() => {
    if (threadId) {
      setMessages((prev) => [...prev, { text: `Número de thread ${threadId}`, isGpt: true }]);
    }
  }, [threadId])

  const handlePost = async (text: string) => {
    if (!threadId) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    try {
      // Get replies from the API
      const replies = await postQuestionUseCase(threadId, text);

      // Only add assistant messages (not user messages) from the replies
      for (const reply of replies) {
        if (reply.role === 'assistant') {
          for (const messageContent of reply.content) {
            setMessages((prev) => [...prev, {
              text: messageContent,
              isGpt: true,
              info: reply
            }]);
          }
        }
      }
    } catch (error) {
      console.error('Error posting question:', error);
      setMessages((prev) => [...prev, {
        text: 'Lo siento, ha ocurrido un error al procesar tu pregunta.',
        isGpt: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, soy Moni en que puedo ayudarte ? " />
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

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe tu texto aquí"
        disableCorrections={true}
      />

    </div>
  )
}
