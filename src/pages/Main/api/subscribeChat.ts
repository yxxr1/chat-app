import { makeQuery } from '@/shared/utils/actions';
import type { Message, Chat } from '@/shared/store/types';
import type { SubscribedChat } from '@/shared/types/subscribeData';
import { handleSubscribedChatData } from '@/shared/utils/subscribeData';

export const subscribeChat = (
  chatId: Chat['id'],
  lastMessageId: Message['id'] | null,
  callback: (isFailure: boolean) => void,
  signal?: AbortSignal,
) =>
  makeQuery<SubscribedChat>(
    'subscribe',
    'GET',
    { chatId, lastMessageId },
    (dispatch, data) => {
      handleSubscribedChatData(data, dispatch);

      callback(false);
    },
    () => {
      callback(true);
    },
    { signal },
  );
