import { makeQuery } from '@utils/actions';
import { quitChat as quitChatSync } from '@actions/sync/quitChat';

interface ResponseType {
  chatId: string;
}

export const quitChat = (chatId: string) =>
  makeQuery<ResponseType>('quit', 'POST', { chatId }, (dispatch, data) => {
    dispatch(quitChatSync(data.chatId));
  });
