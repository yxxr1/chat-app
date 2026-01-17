import { makeQuery } from '@/shared/utils/actions';
import type { Chat, State } from '@/store';
import { setChatList, joinChat, logoutUser } from '@/store';

interface ResponseType {
  chats: Chat[];
  joinedChatsIds: Chat['id'][];
}

export const getChats = () =>
  makeQuery<State, ResponseType>(
    'chats',
    'GET',
    null,
    (dispatch, data) => {
      dispatch(setChatList(data.chats));
      data.joinedChatsIds.forEach((chatId) => dispatch(joinChat(chatId)));
    },
    undefined,
    logoutUser,
  );
