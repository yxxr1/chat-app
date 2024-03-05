import { Message, Chat } from '@store/types';

type WSMessage<Type, Payload> = {
  type: Type;
  payload: Payload;
};

export type WatchChats = WSMessage<
  'WATCH_CHATS',
  {
    newChats: Chat[];
    deletedChatsIds: Chat['id'][];
    updatedChats: Chat[];
  }
>;

export type ChatSubscribe = WSMessage<
  'SUBSCRIBED_CHAT',
  {
    chatId: Chat['id'];
    messages: Message[];
  }
>;

export type WSMessageIncoming = ChatSubscribe | WatchChats;

export type WSMessageOutgoing =
  | WSMessage<
      'PUBLISH_MESSAGE',
      {
        chatId: Chat['id'];
        message: Message['text'];
      }
    >
  | WSMessage<
      'SUBSCRIBE_CHAT',
      {
        chatId: Chat['id'];
        lastMessageId: Message['id'] | null;
      }
    >;
