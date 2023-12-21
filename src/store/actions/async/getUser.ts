import { makeQuery } from '@utils/actions';
import { setUser } from '@actions/sync';
import { User } from '@store/types';

export const getUser = () =>
  makeQuery<User>(
    'user',
    'GET',
    null,
    (dispatch, data) => {
      dispatch(setUser(data));
    },
    (dispatch) => {
      dispatch(setUser(null));
    },
  );
