import { setUser as setUserSync } from '@/shared/store';
import { makeQuery } from '@/shared/utils/actions';
import { setToken } from '@/shared/network';

type ResponseType = Record<string, never>;

export const logoutUser = () =>
  makeQuery<ResponseType>(
    'auth/logout',
    'POST',
    {},
    (dispatch) => {
      setToken(undefined);
      dispatch(setUserSync(null));
    },
    undefined,
    { credentials: 'include' },
    false,
  );
