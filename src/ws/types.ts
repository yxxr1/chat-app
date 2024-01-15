import { Message, Chat } from '@store/types';

type WSMessage<Type, Payload> = {
  type: Type;
  payload: Payload;
};

export type WSMessageIncoming =
  | WSMessage<
      'SUBSCRIBED_CHAT',
      {
        chatId: Chat['id'];
        messages: Message[];
      }
    >
  | WSMessage<
      'WATCH_CHATS',
      {
        newChats: Chat[];
        deletedChatsIds: Chat['id'][];
        updatedChats: Chat[];
      }
    >;

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
