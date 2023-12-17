import { notification } from 'antd';
import { makeQuery } from '@utils/actions';
import { Chat } from '@store/types';

export const createChat = (name: Chat['name']) =>
  makeQuery('chats', 'POST', { name }, null, (dispatch, { message }) => {
    notification.error({ message });
  });
