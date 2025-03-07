import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../../components"

export const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessages text="Hola, escribe tu texto en español y comenzaré con las correcciones." />
          <MyMessage text="Hola comeinza con esto" />
          <TypingLoader className="fade-in" />
        </div>
      </div>

      <TextMessageBox
        onSendMessage={(message) => console.log(message)}
        placeholder="Escribe tu texto aquí"
        disableCorrections={true}
      />

    </div>
  )
}
