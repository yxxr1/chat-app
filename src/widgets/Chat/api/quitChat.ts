import { makeQuery } from '@/shared/utils/actions';
import { quitChat as quitChatSync, logoutUser } from '@/store';
import type { Chat, State } from '@/store';

interface ResponseType {
  chatId: string;
}

export const quitChat = (chatId: Chat['id']) =>
  makeQuery<State, ResponseType>(
    'quit',
    'POST',
    { chatId },
    (dispatch, data) => {
      dispatch(quitChatSync(data.chatId));
    },
    undefined,
    logoutUser,
  );
