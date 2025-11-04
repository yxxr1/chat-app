import { makeQuery } from '@/shared/utils/actions';
import { quitChat as quitChatSync } from '@/shared/store';
import { Chat } from '@/shared/store/types';

interface ResponseType {
  chatId: string;
}

export const quitChat = (chatId: Chat['id']) =>
  makeQuery<ResponseType>('quit', 'POST', { chatId }, (dispatch, data) => {
    dispatch(quitChatSync(data.chatId));
  });
