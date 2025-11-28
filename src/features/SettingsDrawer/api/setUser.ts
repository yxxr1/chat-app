import { setUser as setUserSync, logoutUser } from '@/store';
import { makeQuery } from '@/shared/utils/actions';
import type { User, UserSettings, State } from '@/store';
import { setTheme } from '@/shared/utils/theme';

export const setUser = (username: User['username'], settings: Partial<UserSettings>) =>
  makeQuery<State, User>(
    'user',
    'POST',
    { username, settings },
    (dispatch, data) => {
      dispatch(setUserSync(data));
      setTheme(data.settings.theme);
    },
    undefined,
    logoutUser,
  );
