import { makeQuery } from '@utils/actions';
import { Chat, Message } from '@store/types';
import { addMessages, joinChat as joinChatSync } from '@actions/sync';

type ResponseType = Chat & {
  messages: Message[];
};

export const joinChat = (chatId: Chat['id']) =>
  makeQuery<ResponseType>('join', 'POST', { chatId }, (dispatch, data) => {
    dispatch(joinChatSync(chatId));
    dispatch(addMessages(data.messages, chatId));
  });
