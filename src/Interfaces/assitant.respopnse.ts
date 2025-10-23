export interface QuestionResponse {
    message: {
        role: string,
        content: string;
    };
    threadId: string
}
