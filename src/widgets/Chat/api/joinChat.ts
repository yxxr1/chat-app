import { makeQuery } from '@utils/actions';
import { Chat, Message } from '@store/types';
import { addMessages, joinChat as joinChatSync } from '@store';

type ResponseType = Chat & {
  messages: Message[];
};

export const joinChat = (chatId: Chat['id']) =>
  makeQuery<ResponseType>('join', 'POST', { chatId }, (dispatch, data) => {
    dispatch(joinChatSync(chatId));
    dispatch(addMessages({ id: chatId, messages: data.messages }));
  });
