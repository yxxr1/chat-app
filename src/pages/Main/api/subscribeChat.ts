import { makeQuery } from '@utils/actions';
import { Message, Chat } from '@store/types';
import { SubscribedChat } from '@shared/types/subscribeData';
import { handleSubscribedChatData } from '@utils/subscribeData';

export const subscribeChat = (
  chatId: Chat['id'],
  lastMessageId: Message['id'] | null,
  callback: (isFailure: boolean) => void,
  signal?: AbortSignal,
) =>
  makeQuery<SubscribedChat>(
    'subscribe',
    'POST',
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
