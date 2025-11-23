import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { State, Chat, User, UserSettings } from '@/shared/store/types';
import { CONNECTION_METHODS } from '@/shared/const/settings';
import { SSEManager, WebSocketManager, setToken } from '@/shared/network';
import { setUser as setUserSync, store } from '@/shared/store';
import { addSubscribedChats, clearSubscribedChats } from '@/shared/store';
import type { SubscribedChat, WatchChats } from '@/shared/types/subscribeData';
import { handleSubscribedChatData, handleWatchChatsData } from '@/shared/utils/subscribeData';
import { COMMON_CONFIG } from '@/shared/config/common';
import { publishChat } from '@/features/MessageInput/api/publishChat';
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

  const wsManager = useMemo(() => new WebSocketManager(), []);

  const onRefreshError = () => {
    setToken(undefined);
    dispatch(setUserSync(null));
  };

  useEffect(() => {
    dispatch(clearSubscribedChats());

    subscribeAbortController.current = new AbortController();

    if (connectionMethod === CONNECTION_METHODS.WS) {
      wsManager.connect(COMMON_CONFIG.WS_URL, onRefreshError, () => dispatch(clearSubscribedChats()));

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
      const sseManager = new SSEManager<WatchChats>(
        `${COMMON_CONFIG.API_URL}/sse/chats-subscribe`,
        (data) => {
          handleWatchChatsData(data, dispatch);
        },
        onRefreshError,
      );

      setOnAbort(() => sseManager.close());
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
          const subscribe = () => {
            const lastMessageId = getLastMessageId(chatId);
            dispatch(subscribeChat(chatId, lastMessageId, subscribe, subscribeAbortController.current?.signal));
          };

          subscribe();
        } else if (connectionMethod === CONNECTION_METHODS.SSE) {
          const getUrlParams = () => {
            const lastMessageId = getLastMessageId(chatId);
            const search = new URLSearchParams();
            search.set('chatId', chatId);
            if (lastMessageId) search.set('lastMessageId', lastMessageId);

            return search;
          };

          const sseManager = new SSEManager<SubscribedChat>(
            `${COMMON_CONFIG.API_URL}/sse/subscribe`,
            (data) => {
              handleSubscribedChatData(data, dispatch);
            },
            onRefreshError,
            getUrlParams,
          );

          setOnAbort(() => sseManager.close());
        }

        subscribedChats.push(chatId);
      }
    });

    if (subscribedChats.length) {
      dispatch(addSubscribedChats(subscribedChats));
    }
  }, [joinedChatsIds, subscribedChatsIds]);

  const sendMessage = useCallback(
    (chatId: Chat['id'], messageText: string) => {
      if (connectionMethod === CONNECTION_METHODS.WS) {
        wsManager.sendMessage('PUBLISH_MESSAGE', { chatId, message: messageText });
      } else {
        // HTTP, SSE
        dispatch(publishChat(chatId, messageText));
      }
    },
    [connectionMethod, wsManager],
  );

  return { sendMessage };
};
