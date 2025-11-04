import { Chat, Message } from '@/shared/store/types';

export type SubscribedChat = {
  chatId: Chat['id'];
  messages: Message[];
};

export type WatchChats = {
  newChats: Chat[];
  deletedChatsIds: Chat['id'][];
  updatedChats: Chat[];
};
