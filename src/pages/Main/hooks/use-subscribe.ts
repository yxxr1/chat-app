import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Chat, User, UserSettings } from '@store/types';
import { CONNECTION_METHODS } from '@const/settings';
import { wsManager } from '@ws';
import { ChatSubscribe, WatchChats } from '@ws/types';
import { store } from '@store';
import { addChats, deleteChats, addMessages, addSubscribedChats, clearSubscribedChats, updateChat } from '@store';
import { hasNotificationPermission, sendMessageNotification } from '@utils/notification';
import { subscribeChat } from '../api/subscribeChat';
import { watchChatsUpdates } from '../api/watchChatsUpdates';

let subscribeAbortController: AbortController;

export const useSubscribe = () => {
  const {
    settings: { connectionMethod },
    joinedChatsIds,
    subscribedChatsIds,
  } = useSelector<State, { settings: UserSettings } & Pick<State, 'joinedChatsIds' | 'subscribedChatsIds'>>(
    ({ user, joinedChatsIds, subscribedChatsIds }) => ({
      settings: (user as User).settings,
      joinedChatsIds,
      subscribedChatsIds,
    }),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSubscribedChats());

    if (connectionMethod === CONNECTION_METHODS.WS) {
      wsManager.connect();

      wsManager.subscribe<WatchChats>('WATCH_CHATS', (payload) => {
        if (payload.newChats.length) {
          dispatch(addChats(payload.newChats));
        }

        if (payload.deletedChatsIds.length) {
          dispatch(deleteChats(payload.deletedChatsIds));
        }

        payload.updatedChats.forEach((chat) => dispatch(updateChat(chat)));
      });

      wsManager.subscribe<ChatSubscribe>('SUBSCRIBED_CHAT', (payload) => {
        if (payload.messages) {
          dispatch(addMessages({ id: payload.chatId, messages: payload.messages }));

          if (hasNotificationPermission()) {
            payload.messages.forEach((message) => sendMessageNotification(message, payload.chatId));
          }
        }
      });

      return () => wsManager.close();
    } else if (connectionMethod === CONNECTION_METHODS.HTTP) {
      subscribeAbortController = new AbortController();
      dispatch(watchChatsUpdates(subscribeAbortController.signal));

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
              dispatch(subscribeChat(chatId, lastMessageId, subscribe, subscribeAbortController.signal));
            }
          };

          subscribe();
        }

        subscribedChats.push(chatId);
      }
    });

    if (subscribedChats.length) {
      dispatch(addSubscribedChats(subscribedChats));
    }
  }, [joinedChatsIds, subscribedChatsIds]);
};
