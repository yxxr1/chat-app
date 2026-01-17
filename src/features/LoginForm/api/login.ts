import { setUser as setUserSync } from '@/store';
import { makeQuery } from '@/shared/utils/actions';
import { setTheme } from '@/shared/utils/theme';
import type { User, State } from '@/store';
import { setToken } from '@/shared/network';

type ResponseType = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export const login = (username: string, password: string) =>
  makeQuery<State, ResponseType>(
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
    undefined,
    false,
  );
