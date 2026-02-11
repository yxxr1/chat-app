import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { State, Chat, User, UserSettings } from '@/store';
import { useAppSelector, useAppDispatch } from '@/store';
import { CONNECTION_METHODS } from '@/const/settings';
import { SSEManager, WebSocketManager } from '@/shared/network';
import { store, addSubscribedChats, clearSubscribedChats, handleSubscribedChatData, handleWatchChatsData, logoutUser } from '@/store';
import type { SubscribedChat, WatchChats } from '@/types/subscribeData';
import { COMMON_CONFIG, REFRESH_URL } from '@/config/common';
import { publishChat } from '@/features/MessageInput/api/publishChat';
import type { WSMessageIncoming, WSMessageOutgoing } from '@/types/ws';
import {
  PUBLISH_MESSAGE_OUTGOING_TYPE,
  SUBSCRIBE_CHAT_OUTGOING_TYPE,
  SUBSCRIBED_CHAT_INCOMING_TYPE,
  WATCH_CHATS_INCOMING_TYPE,
} from '@/const/ws';
import { subscribeChat } from '../api/subscribeChat';
import { watchChatsUpdates } from '../api/watchChatsUpdates';

export const useSubscribe = () => {
  const {
    settings: { connectionMethod },
    joinedChatsIds,
    subscribedChatsIds,
  } = useAppSelector<State, { settings: UserSettings } & Pick<State, 'joinedChatsIds' | 'subscribedChatsIds'>>(
    ({ user, joinedChatsIds, subscribedChatsIds }) => ({
      settings: ((user as User) || {}).settings,
      joinedChatsIds,
      subscribedChatsIds,
    }),
  );
  const dispatch = useAppDispatch();
  const subscribeAbortController = useRef<AbortController | null>(null);
  const setOnAbort = (cb: () => void) => subscribeAbortController.current?.signal.addEventListener('abort', cb);

  const wsManager = useMemo(() => new WebSocketManager<WSMessageIncoming, WSMessageOutgoing>(), []);

  const onRefreshError = () => {
    logoutUser(dispatch);
  };

  useEffect(() => {
    dispatch(clearSubscribedChats());

    subscribeAbortController.current = new AbortController();

    if (connectionMethod === CONNECTION_METHODS.WS) {
      wsManager.connect(COMMON_CONFIG.WS_URL, REFRESH_URL, onRefreshError, () => dispatch(clearSubscribedChats()));

      wsManager.subscribe(WATCH_CHATS_INCOMING_TYPE, (payload) => {
        handleWatchChatsData(payload, dispatch);
      });

      wsManager.subscribe(SUBSCRIBED_CHAT_INCOMING_TYPE, (payload) => {
        handleSubscribedChatData(payload, dispatch);
      });

      setOnAbort(() => wsManager.close());
    } else if (connectionMethod === CONNECTION_METHODS.HTTP) {
      dispatch(watchChatsUpdates(subscribeAbortController.current?.signal));
    } else if (connectionMethod === CONNECTION_METHODS.SSE) {
      const sseManager = new SSEManager<WatchChats>(
        `${COMMON_CONFIG.API_URL}/sse/chats-subscribe`,
        REFRESH_URL,
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
          wsManager.sendMessage(SUBSCRIBE_CHAT_OUTGOING_TYPE, { chatId, lastMessageId });
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
            REFRESH_URL,
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
        wsManager.sendMessage(PUBLISH_MESSAGE_OUTGOING_TYPE, { chatId, message: messageText });
      } else {
        // HTTP, SSE
        dispatch(publishChat(chatId, messageText));
      }
    },
    [connectionMethod, wsManager],
  );

  return { sendMessage };
};
