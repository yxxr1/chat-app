import { makeQuery } from '@/shared/utils/actions';
import { setUser } from '@/shared/store';
import type { User } from '@/shared/store/types';
import { setTheme } from '@/shared/utils/theme';

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
