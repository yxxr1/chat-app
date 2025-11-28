import { notification } from 'antd';
import { makeQuery } from '@/shared/utils/actions';
import type { Chat, State } from '@/store';
import { logoutUser } from '@/store';

export const createChat = (name: Chat['name']) =>
  makeQuery<State, Chat>(
    'chats',
    'POST',
    { name },
    null,
    (dispatch, { message }) => {
      notification.error({ message });
    },
    logoutUser,
  );
