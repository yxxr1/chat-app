import { setUser as setUserSync } from '@/shared/store';
import { makeQuery } from '@/shared/utils/actions';
import { User, UserSettings } from '@/shared/store/types';
import { setTheme } from '@/shared/utils/theme';

export const setUser = (name: User['name'], settings: Partial<UserSettings>) =>
  makeQuery<User>('user', 'POST', { name, settings }, (dispatch, data) => {
    dispatch(setUserSync(data));
    setTheme(data.settings.theme);
  });
