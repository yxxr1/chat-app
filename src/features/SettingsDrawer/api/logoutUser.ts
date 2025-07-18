import { notification } from 'antd';
import { setUser as setUserSync } from '@store';
import { makeQuery } from '@utils/actions';
import { User } from '@store/types';

type ResponseType =
  | User
  | {
      id: null;
      name: null;
    };

export const logoutUser = () =>
  makeQuery<ResponseType>(
    'auth',
    'POST',
    { name: null },
    (dispatch, data) => {
      if (data.id === null) {
        dispatch(setUserSync(null));
      }
    },
    (dispatch, { message }) => {
      notification.error({ message });
    },
  );
