import { setUser as setUserSync } from '@/shared/store';
import { makeQuery } from '@/shared/utils/actions';
import { setTheme } from '@/shared/utils/theme';
import type { User } from '@/shared/store/types';
import { setToken } from '@/shared/utils/token';

type ResponseType = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export const login = (username: string, password: string) =>
  makeQuery<ResponseType>(
    'auth/login',
    'POST',
    { username, password },
    (dispatch, data) => {
      setToken(data.accessToken);
      dispatch(setUserSync(data.user));
      setTheme(data.user.settings.theme);
    },
    undefined,
    undefined,
    false,
  );
