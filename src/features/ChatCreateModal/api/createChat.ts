import { notification } from 'antd';
import { makeQuery } from '@/shared/utils/actions';
import type { Chat } from '@/shared/store/types';

export const createChat = (name: Chat['name']) =>
  makeQuery('chats', 'POST', { name }, null, (dispatch, { message }) => {
    notification.error({ message });
  });
