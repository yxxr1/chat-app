import { makeQuery } from '@/shared/utils/actions';
import type { Message, Chat, State } from '@/store';
import { addMessages, logoutUser } from '@/store';
import type { MessagesDirections } from '@/const/messages';

interface ResponseType {
  messages: Message[];
}

export const getMessages = (chatId: Chat['id'], lastMessageId: Message['id'], direction: MessagesDirections) =>
  makeQuery<State, ResponseType>(
    'messages',
    'GET',
    { chatId, lastMessageId, direction },
    (dispatch, data) => {
      if (data.messages.length) {
        dispatch(addMessages({ id: chatId, messages: data.messages }));
      }
    },
    undefined,
    logoutUser,
  );
