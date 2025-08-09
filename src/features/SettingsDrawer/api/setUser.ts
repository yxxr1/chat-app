import { setUser as setUserSync } from '@store';
import { makeQuery } from '@utils/actions';
import { User, UserSettings } from '@store/types';
import { setTheme } from '@utils/theme';

export const setUser = (name: User['name'], settings: Partial<UserSettings>) =>
  makeQuery<User>('user', 'POST', { name, settings }, (dispatch, data) => {
    dispatch(setUserSync(data));
    setTheme(data.settings.theme);
  });
