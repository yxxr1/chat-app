import { makeQuery } from '@utils/actions';
import { setUser } from '@store';
import { User } from '@store/types';
import { setTheme } from '@utils/theme';

export const getUser = () =>
  makeQuery<User>(
    'user',
    'GET',
    null,
    (dispatch, data) => {
      dispatch(setUser(data));
      setTheme(data.settings.theme);
    },
    (dispatch) => {
      dispatch(setUser(null));
    },
  );
