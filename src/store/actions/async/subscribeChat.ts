import { makeQuery } from '@utils/actions';
import { Message } from '@store/types';
import { addMessages } from '@actions/sync/addMessages';

interface ResponseType {
  messages: Message[];
}

export const subscribeChat = (chatId: string, lastMessageId: string, callback: (isFailure: boolean) => void) =>
  makeQuery<ResponseType>(
    'subscribe',
    'POST',
    { chatId, lastMessageId },
    (dispatch, data) => {
      if (data.messages.length) {
        dispatch(addMessages(data.messages, chatId));
      }

      callback(false);
    },
    () => {
      callback(true);
    },
  );
