declare global {
  interface AppContext {
    sendMessage?: (chatId: string, message: string) => void;
  }
}

export {};
