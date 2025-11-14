import { setUser as setUserSync } from '@/shared/store';
import { makeQuery } from '@/shared/utils/actions';
import type { User, UserSettings } from '@/shared/store/types';
import { setTheme } from '@/shared/utils/theme';

export const setUser = (username: User['username'], settings: Partial<UserSettings>) =>
  makeQuery<User>('user', 'POST', { username, settings }, (dispatch, data) => {
    dispatch(setUserSync(data));
    setTheme(data.settings.theme);
  });
