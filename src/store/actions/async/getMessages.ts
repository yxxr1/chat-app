import { notification } from 'antd';
import { makeQuery } from '@utils/actions';
import { Message, Chat } from '@store/types';
import { addMessages } from '@actions/sync';

export const DIRECTIONS = {
  PREV: 'PREV',
  NEXT: 'NEXT',
} as const;

interface ResponseType {
  messages: Message[];
}

export const getMessages = (chatId: Chat['id'], lastMessageId: Message['id'], direction: (typeof DIRECTIONS)[keyof typeof DIRECTIONS]) =>
  makeQuery<ResponseType>(
    'messages',
    'POST',
    { chatId, lastMessageId, direction },
    (dispatch, data) => {
      if (data.messages.length) {
        dispatch(addMessages(data.messages, chatId));
      }
    },
    (dispatch, { message }) => {
      notification.error({ message });
    },
  );
