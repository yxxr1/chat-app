import { notification } from 'antd';
import { setUser as setUserSync } from '@actions/sync/setUser';
import { makeQuery } from '@utils/actions';

interface ResponseType {
  name: string | null;
  id: string;
}

export const setUser = (name: string | null) =>
  makeQuery<ResponseType>(
    'user',
    'POST',
    { name },
    (dispatch, data) => {
      dispatch(setUserSync(data));
    },
    (dispatch, { message }) => {
      notification.error({ message });
    },
  );
