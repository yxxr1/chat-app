import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Chat, User, UserSettings } from '@/shared/store/types';
import { CONNECTION_METHODS } from '@/shared/const/settings';
import { wsManager } from '@/shared/ws';
import { store } from '@/shared/store';
import { addSubscribedChats, clearSubscribedChats } from '@/shared/store';
import { getEventSource } from '@/shared/sse';
import { SubscribedChat, WatchChats } from '@/shared/types/subscribeData';
import { handleSubscribedChatData, handleWatchChatsData } from '@/shared/utils/subscribeData';
import { subscribeChat } from '../api/subscribeChat';
import { watchChatsUpdates } from '../api/watchChatsUpdates';

export const useSubscribe = () => {
  const {
    settings: { connectionMethod },
    joinedChatsIds,
    subscribedChatsIds,
  } = useSelector<State, { settings: UserSettings } & Pick<State, 'joinedChatsIds' | 'subscribedChatsIds'>>(
    ({ user, joinedChatsIds, subscribedChatsIds }) => ({
      settings: ((user as User) || {}).settings,
      joinedChatsIds,
      subscribedChatsIds,
    }),
  );
  const dispatch = useDispatch();
  const subscribeAbortController = useRef<AbortController | null>(null);
  const setOnAbort = (cb: () => void) => subscribeAbortController.current?.signal.addEventListener('abort', cb);

  useEffect(() => {
    dispatch(clearSubscribedChats());

    subscribeAbortController.current = new AbortController();

    if (connectionMethod === CONNECTION_METHODS.WS) {
      wsManager.connect();

      wsManager.subscribe('WATCH_CHATS', (payload) => {
        handleWatchChatsData(payload, dispatch);
      });

      wsManager.subscribe('SUBSCRIBED_CHAT', (payload) => {
        handleSubscribedChatData(payload, dispatch);
      });

      setOnAbort(() => wsManager.close());
    } else if (connectionMethod === CONNECTION_METHODS.HTTP) {
      dispatch(watchChatsUpdates(subscribeAbortController.current?.signal));
    } else if (connectionMethod === CONNECTION_METHODS.SSE) {
      const eventSource = getEventSource<WatchChats>('/sse/chats-subscribe', (data) => {
        handleWatchChatsData(data, dispatch);
      });

      setOnAbort(() => eventSource.close());
    }

    return () => subscribeAbortController.current?.abort();
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
              dispatch(subscribeChat(chatId, lastMessageId, subscribe, subscribeAbortController.current?.signal));
            }
          };

          subscribe();
        } else if (connectionMethod === CONNECTION_METHODS.SSE) {
          const lastMessageId = getLastMessageId(chatId);
          const eventSource = getEventSource<SubscribedChat>(
            `/sse/subscribe?chatId=${encodeURIComponent(chatId)}${
              lastMessageId ? `&lastMessageId=${encodeURIComponent(lastMessageId)}` : ''
            }`,
            (data) => {
              handleSubscribedChatData(data, dispatch);
            },
          );

          setOnAbort(() => eventSource.close());
        }

        subscribedChats.push(chatId);
      }
    });

    if (subscribedChats.length) {
      dispatch(addSubscribedChats(subscribedChats));
    }
  }, [joinedChatsIds, subscribedChatsIds]);
};
