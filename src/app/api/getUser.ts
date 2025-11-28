import { makeQuery } from '@/shared/utils/actions';
import { setUser, logoutUser } from '@/store';
import type { User, State } from '@/store';
import { setTheme } from '@/shared/utils/theme';

export const getUser = () =>
  makeQuery<State, User>(
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
    logoutUser,
  );
