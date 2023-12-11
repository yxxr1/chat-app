import { notification } from 'antd';
import { makeQuery } from '@utils/actions';

export const createChat = (name: string) =>
  makeQuery('chats', 'POST', { name }, null, (dispatch, { message }) => {
    notification.error({ message });
  });
