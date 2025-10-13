import { RouterProvider } from "react-router-dom"
import { router } from "./Presentation/router/router"
import { ChatProvider } from "./context/ChatProvider"

export const ReactGPT = () => {
  return (
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  )
}
