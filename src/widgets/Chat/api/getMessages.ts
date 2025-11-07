import { makeQuery } from '@/shared/utils/actions';
import type { Message, Chat } from '@/shared/store/types';
import { addMessages } from '@/shared/store';
import type { MessagesDirections } from '@/shared/const/messages';

interface ResponseType {
  messages: Message[];
}

export const getMessages = (chatId: Chat['id'], lastMessageId: Message['id'], direction: MessagesDirections) =>
  makeQuery<ResponseType>('messages', 'GET', { chatId, lastMessageId, direction }, (dispatch, data) => {
    if (data.messages.length) {
      dispatch(addMessages({ id: chatId, messages: data.messages }));
    }
  });
