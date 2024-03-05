import { makeQuery } from '@utils/actions';
import { Message, Chat } from '@store/types';
import { addMessages } from '@store';

interface ResponseType {
  messages: Message[];
}

export const subscribeChat = (
  chatId: Chat['id'],
  lastMessageId: Message['id'] | null,
  callback: (isFailure: boolean) => void,
  signal: AbortSignal,
) =>
  makeQuery<ResponseType>(
    'subscribe',
    'POST',
    { chatId, lastMessageId },
    (dispatch, data) => {
      if (data.messages.length) {
        dispatch(addMessages({ id: chatId, messages: data.messages }));
      }

      callback(false);
    },
    () => {
      callback(true);
    },
    { signal },
  );
