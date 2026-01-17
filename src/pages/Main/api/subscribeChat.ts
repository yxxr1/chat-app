import { makeQuery } from '@/shared/utils/actions';
import type { Message, Chat, State } from '@/store';
import type { SubscribedChat } from '@/types/subscribeData';
import { logoutUser, handleSubscribedChatData } from '@/store';

export const subscribeChat = (chatId: Chat['id'], lastMessageId: Message['id'] | null, callback: () => void, signal?: AbortSignal) =>
  makeQuery<State, SubscribedChat>(
    'subscribe',
    'GET',
    { chatId, lastMessageId },
    (dispatch, data) => {
      handleSubscribedChatData(data, dispatch);

      callback();
    },
    null,
    logoutUser,
    { signal },
  );
