import type { State } from '@/store';
import { makeQuery } from '@/shared/utils/actions';
import { logoutUser as logoutUserUtil } from '@/store';

type ResponseType = Record<string, never>;

export const logoutUser = () =>
  makeQuery<State, ResponseType>(
    'auth/logout',
    'POST',
    {},
    (dispatch) => {
      logoutUserUtil(dispatch);
    },
    undefined,
    undefined,
    { credentials: 'include' },
    false,
  );
