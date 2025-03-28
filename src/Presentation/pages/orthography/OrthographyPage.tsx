import { useState } from "react";
import { GptMessages, GptOrthograpyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { orthographyUseCase } from "../../../Core/use-cases";


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

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

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
              messages.isGpt ? (
                <GptOrthograpyMessage
                  key={index}
                  errors={messages.info!.errors}
                  message={messages.info!.message}
                  useScore={messages.info!.userScore}
                />
              ) : (<MyMessage key={index} text={messages.text} />)
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
      {/* <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe tu texto aquí"
      /> */}

      {/* <TextMessageBoxSelect
        options={[
          { id: "1", text: "Opción 1" },
          { id: "2", text: "Opción 2" },
          { id: "3", text: "Opción 3" },
          { id: "4", text: "Opción 4" },
          { id: "5", text: "Opción 5" },

        ]}
        onSendMessage={console.log}
      /> */}

    </div>
  )
}
