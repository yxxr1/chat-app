import { notification } from 'antd';
import { setUser as setUserSync } from '@actions/sync';
import { makeQuery } from '@utils/actions';
import { User } from '@store/types';

type ResponseType =
  | User
  | {
      id: null;
      name: null;
    };

export const authUser = (name: User['name'] | null) =>
  makeQuery<ResponseType>(
    'auth',
    'POST',
    { name },
    (dispatch, data) => {
      dispatch(setUserSync(data.id === null ? null : data));
    },
    (dispatch, { message }) => {
      notification.error({ message });
    },
  );
