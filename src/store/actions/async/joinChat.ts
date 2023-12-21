import { makeQuery } from '@utils/actions';
import { Message, Chat } from '@store/types';
import { addMessages, joinChat as joinChatSync } from '@actions/sync';

interface ResponseType {
  messages: Message[];
}

export const joinChat = (chatId: Chat['id']) =>
  makeQuery<ResponseType>('join', 'POST', { chatId }, (dispatch, data) => {
    dispatch(joinChatSync(chatId));
    dispatch(addMessages(data.messages, chatId));
  });
