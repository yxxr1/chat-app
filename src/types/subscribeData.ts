import type { Chat, Message } from '@/store';

export type SubscribedChat = {
  chatId: Chat['id'];
  messages: Message[];
};

export type WatchChats = {
  newChats: Chat[];
  deletedChatsIds: Chat['id'][];
  updatedChats: Chat[];
};
