import { makeQuery } from '@/shared/utils/actions';
import type { Chat } from '@/shared/store/types';
import { setChatList, joinChat } from '@/shared/store';

interface ResponseType {
  chats: Chat[];
  joinedChatsIds: Chat['id'][];
}

export const getChats = () =>
  makeQuery<ResponseType>('chats', 'GET', null, (dispatch, data) => {
    dispatch(setChatList(data.chats));
    data.joinedChatsIds.forEach((chatId) => dispatch(joinChat(chatId)));
  });
