import { notification } from 'antd';
import { setUser as setUserSync } from '@store';
import { makeQuery } from '@utils/actions';
import { setTheme } from '@utils/theme';
import { User, UserSettings } from '@store/types';

type ResponseType =
  | User
  | {
      id: null;
      name: null;
    };

export const authUser = (name: User['name'], settings?: Partial<UserSettings>) =>
  makeQuery<ResponseType>(
    'auth',
    'POST',
    { name, settings },
    (dispatch, data) => {
      if (data.id === null) {
        dispatch(setUserSync(null));
      } else {
        dispatch(setUserSync(data));
        setTheme(data.settings.theme);
      }
    },
    (dispatch, { message }) => {
      notification.error({ message });
    },
  );
