import { Message, Chat } from '@store/types';
import { WatchChats as WatchChatsPayload, SubscribedChat as SubscribedChatPayload } from '@shared/types/subscribeData';

type WSMessage<Type extends string, Payload> = {
  type: Type;
  payload: Payload;
};
type GetPayloadByType<T extends WSMessage<string, unknown>> = {
  [type in T['type']]: Extract<T, { type: type }>['payload'];
};

export type WatchChats = WSMessage<'WATCH_CHATS', WatchChatsPayload>;
export type ChatSubscribe = WSMessage<'SUBSCRIBED_CHAT', SubscribedChatPayload>;

export type WSMessageIncoming = ChatSubscribe | WatchChats;
export type WSMessageIncomingPayloadByType = GetPayloadByType<WSMessageIncoming>;

type PublishMessage = WSMessage<
  'PUBLISH_MESSAGE',
  {
    chatId: Chat['id'];
    message: Message['text'];
  }
>;
type SubscribeChat = WSMessage<
  'SUBSCRIBE_CHAT',
  {
    chatId: Chat['id'];
    lastMessageId: Message['id'] | null;
  }
>;

export type WSMessageOutgoing = PublishMessage | SubscribeChat;
export type WSMessageOutgoingPayloadByType = GetPayloadByType<WSMessageOutgoing>;
