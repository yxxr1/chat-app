import { setUser as setUserSync } from '@/shared/store';
import { makeQuery } from '@/shared/utils/actions';
import { setTheme } from '@/shared/utils/theme';
import type { User, UserSettings } from '@/shared/store/types';

type ResponseType =
  | User
  | {
      id: null;
      name: null;
    };

export const authUser = (name: User['name'], settings?: Partial<UserSettings>) =>
  makeQuery<ResponseType>('auth', 'POST', { name, settings }, (dispatch, data) => {
    if (data.id === null) {
      dispatch(setUserSync(null));
    } else {
      dispatch(setUserSync(data));
      setTheme(data.settings.theme);
    }
  });
