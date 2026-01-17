import { makeQuery } from '@/shared/utils/actions';
import type { Chat, Message, State } from '@/store';
import { addMessages, joinChat as joinChatSync, logoutUser } from '@/store';

type ResponseType = Chat & {
  messages: Message[];
};

export const joinChat = (chatId: Chat['id']) =>
  makeQuery<State, ResponseType>(
    'join',
    'POST',
    { chatId },
    (dispatch, data) => {
      dispatch(joinChatSync(chatId));
      dispatch(addMessages({ id: chatId, messages: data.messages }));
    },
    undefined,
    logoutUser,
  );
