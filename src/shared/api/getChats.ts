import { makeQuery } from '@utils/actions';
import { Chat } from '@store/types';
import { setChatList, joinChat } from '@store';

interface ResponseType {
  chats: Chat[];
  joinedChatsIds: Chat['id'][];
}

export const getChats = () =>
  makeQuery<ResponseType>('chats', 'GET', null, (dispatch, data) => {
    dispatch(setChatList(data.chats));
    data.joinedChatsIds.forEach((chatId) => dispatch(joinChat(chatId)));
  });
