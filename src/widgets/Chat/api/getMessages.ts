import { makeQuery } from '@utils/actions';
import { Message, Chat } from '@store/types';
import { addMessages } from '@store';
import { MessagesDirections } from '@const/messages';

interface ResponseType {
  messages: Message[];
}

export const getMessages = (chatId: Chat['id'], lastMessageId: Message['id'], direction: MessagesDirections) =>
  makeQuery<ResponseType>('messages', 'GET', { chatId, lastMessageId, direction }, (dispatch, data) => {
    if (data.messages.length) {
      dispatch(addMessages({ id: chatId, messages: data.messages }));
    }
  });
