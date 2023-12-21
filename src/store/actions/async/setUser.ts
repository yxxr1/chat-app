import { notification } from 'antd';
import { setUser as setUserSync } from '@actions/sync';
import { makeQuery } from '@utils/actions';
import { User, UserSettings } from '@store/types';

export const setUser = (name: User['name'], settings: UserSettings) =>
  makeQuery<User>(
    'user',
    'POST',
    { name, settings },
    (dispatch, data) => {
      dispatch(setUserSync(data));
    },
    (dispatch, { message }) => {
      notification.error({ message });
    },
  );
