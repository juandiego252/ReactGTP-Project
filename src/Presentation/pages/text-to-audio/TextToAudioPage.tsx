import { useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBoxSelect, GptMessageAudio } from "../../components";
import { textToAudioUseCase } from "../../../Core/use-cases";

const disclaimer = "El audio que estas escuchando es generado por inteligencia artificial. No corresponde a una voz humana real.";


const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
  { id: 'ash', text: 'Ash' },
  { id: 'ballad', text: 'Ballad' },
  { id: 'coral', text: 'Coral' },
  { id: 'sage', text: 'Sage' },
]

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text'
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio'
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, voice: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false, type: 'text' }]);

    // Todo Use case
    const { ok, message, audioUrl } = await textToAudioUseCase(text, voice);
    setIsLoading(false);
    if (!ok) return;
    // Todo Añádor el mensaje de isGpt en true
    setMessages((prev) => [...prev, { text: `${voice} - ${message}`, isGpt: true, audio: audioUrl!, type: 'audio' }]);
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <span className="flex justify-center items-center">{`Atención: ${disclaimer}`}</span>
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Que audio quieres generar?" />
          {
            messages.map((messages, index) => (
              messages.isGpt ? (
                messages.type === 'audio' ? (<GptMessageAudio key={index} text={messages.text} audio={messages.audio} />) :
                  (
                    <GptMessages key={index} text={messages.text} />
                  )
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

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe tu texto aquí"
        options={voices}
      />

    </div>
  )
}
