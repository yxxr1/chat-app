import type { Chat, Message } from '@/store';
import type { WSMessage } from '@/shared/network';
import type {
  PUBLISH_MESSAGE_OUTGOING_TYPE,
  SUBSCRIBE_CHAT_OUTGOING_TYPE,
  SUBSCRIBED_CHAT_INCOMING_TYPE,
  WATCH_CHATS_INCOMING_TYPE,
} from '@/const/ws';
import type { SubscribedChat as SubscribedChatPayload, WatchChats as WatchChatsPayload } from './subscribeData';

export type WatchChats = WSMessage<typeof WATCH_CHATS_INCOMING_TYPE, WatchChatsPayload>;
export type ChatSubscribe = WSMessage<typeof SUBSCRIBED_CHAT_INCOMING_TYPE, SubscribedChatPayload>;

export type WSMessageIncoming = ChatSubscribe | WatchChats;

type PublishMessage = WSMessage<
  typeof PUBLISH_MESSAGE_OUTGOING_TYPE,
  {
    chatId: Chat['id'];
    message: Message['text'];
  }
>;
type SubscribeChat = WSMessage<
  typeof SUBSCRIBE_CHAT_OUTGOING_TYPE,
  {
    chatId: Chat['id'];
    lastMessageId: Message['id'] | null;
  }
>;

export type WSMessageOutgoing = PublishMessage | SubscribeChat;
