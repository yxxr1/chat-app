import { makeQuery } from '@utils/actions';
import { quitChat as quitChatSync } from '@actions/sync';
import { Chat } from '@store/types';

interface ResponseType {
  chatId: string;
}

export const quitChat = (chatId: Chat['id']) =>
  makeQuery<ResponseType>('quit', 'POST', { chatId }, (dispatch, data) => {
    dispatch(quitChatSync(data.chatId));
  });
