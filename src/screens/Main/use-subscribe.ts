import { useEffect } from 'react';
import { Chat, Message } from '@store/types';
import { CONNECTION_METHODS } from '@const/settings';
import { wsManager } from '@ws';
import { Props } from '@screens/Main';
import { store } from '@store';

type WatchChatsPayload = {
  chats: Chat[];
  deletedChatsIds: Chat['id'][];
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
        if (payload.chats.length) {
          props.addChats(payload.chats);
        }

        if (payload.deletedChatsIds.length) {
          props.deleteChats(payload.deletedChatsIds);
        }
      });

      wsManager.subscribe<ChatSubscribePayload>('SUBSCRIBED_CHAT', (payload) => {
        if (payload.messages) {
          props.addMessages(payload.messages, payload.chatId);
        }
      });

      return () => wsManager.close();
    } else if (connectionMethod === CONNECTION_METHODS.HTTP) {
      const watchChatsAbortController = new AbortController();
      subscribeAbortController = new AbortController();
      props.watchChatsUpdates(watchChatsAbortController.signal);

      return () => {
        subscribeAbortController.abort();
        watchChatsAbortController.abort();
      };
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
