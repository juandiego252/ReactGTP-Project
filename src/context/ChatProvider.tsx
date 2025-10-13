import { createContext, ReactNode, useCallback, useContext, useState } from "react";


interface Message {
    text: string;
    isGpt: boolean;
    [key: string]: any;
}

interface ChatState {
    [route: string]: Message[];
}

interface ChatContextType {
    conversations: ChatState;
    setConversation: (route: string, messages: Message[]) => void;
    getConversation: (route: string) => Message[];
    clearConversation: (route: string) => void;
    clearAllConversation: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [conversations, setConversations] = useState<ChatState>({});

    const setConversation = useCallback((route: string, messages: Message[]) => {
        setConversations(prev => ({
            ...prev,
            [route]: messages
        }));
    }, []);

    const getConversation = useCallback((route: string): Message[] => {
        return conversations[route] || [];
    }, [conversations]);

    const clearConversation = useCallback((route: string) => {
        setConversations(prev => {
            const newState = { ...prev };
            delete newState[route];
            return newState;
        })
    }, [])
    const clearAllConversation = useCallback(() => {
        setConversations({});
    }, []);


    return (
        <ChatContext.Provider value={{
            conversations,
            setConversation,
            getConversation,
            clearConversation,
            clearAllConversation
        }}>
            {children}
        </ChatContext.Provider>
    )
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext debe estar denbtro de ChatProvider');
    }
    return context;
}
