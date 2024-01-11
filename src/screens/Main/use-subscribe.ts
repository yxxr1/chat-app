import { useEffect } from 'react';
import { Chat, Message } from '@store/types';
import { CONNECTION_METHODS } from '@const/settings';
import { wsManager } from '@ws';
import { Props } from '@screens/Main';
import { store } from '@store';

type WatchChatsPayload = {
  newChats: Chat[];
  deletedChatsIds: Chat['id'][];
  updatedChats: Chat[];
};

type ChatSubscribePayload = {
  chatId: Chat['id'];
  messages: Message[];
};

let subscribeAbortController: AbortController;

export const useSubscribe = ({ user, joinedChatsIds, subscribedChatsIds, ...props }: Props) => {
  const { connectionMethod } = user.settings;

  useEffect(() => {
    if (connectionMethod === CONNECTION_METHODS.WS) {
      wsManager.connect();

      wsManager.subscribe<WatchChatsPayload>('WATCH_CHATS', (payload) => {
        if (payload.newChats.length) {
          props.addChats(payload.newChats);
        }

        if (payload.deletedChatsIds.length) {
          props.deleteChats(payload.deletedChatsIds);
        }

        payload.updatedChats.forEach((chat) => props.updateChat(chat));
      });

      wsManager.subscribe<ChatSubscribePayload>('SUBSCRIBED_CHAT', (payload) => {
        if (payload.messages) {
          props.addMessages(payload.messages, payload.chatId);
        }
      });

      return () => wsManager.close();
    } else if (connectionMethod === CONNECTION_METHODS.HTTP) {
      subscribeAbortController = new AbortController();
      props.watchChatsUpdates(subscribeAbortController.signal);

      return () => subscribeAbortController.abort();
    }
  }, [connectionMethod]);

  useEffect(() => {
    const subscribedChats: Chat['id'][] = [];
    const getLastMessageId = (chatId: Chat['id']) => store.getState().allChats[chatId].messages.slice(-1)[0]?.id ?? null;

    joinedChatsIds.forEach((chatId) => {
      if (!subscribedChatsIds.includes(chatId)) {
        if (connectionMethod === CONNECTION_METHODS.WS) {
          const lastMessageId = getLastMessageId(chatId);
          wsManager.sendMessage('SUBSCRIBE_CHAT', { chatId, lastMessageId });
        } else if (connectionMethod === CONNECTION_METHODS.HTTP) {
          const subscribe = (isFailure?: boolean) => {
            if (!isFailure) {
              const lastMessageId = getLastMessageId(chatId);
              props.subscribeChat(chatId, lastMessageId, subscribe, subscribeAbortController.signal);
            }
          };

          subscribe();
        }

        subscribedChats.push(chatId);
      }
    });

    if (subscribedChats.length) {
      props.addSubscribedChats(subscribedChats);
    }
  }, [joinedChatsIds, subscribedChatsIds]);
};
