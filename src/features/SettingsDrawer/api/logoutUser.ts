import { setUser as setUserSync } from '@/shared/store';
import { makeQuery } from '@/shared/utils/actions';
import { User } from '@/shared/store/types';

type ResponseType =
  | User
  | {
      id: null;
      name: null;
    };

export const logoutUser = () =>
  makeQuery<ResponseType>('auth', 'POST', { name: null }, (dispatch, data) => {
    if (data.id === null) {
      dispatch(setUserSync(null));
    }
  });
