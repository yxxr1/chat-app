import { makeQuery } from '@utils/actions';
import { setUser } from '@actions/sync/setUser';

interface ResponseType {
  name: string | null;
  id: string | null;
}

export const getUser = () =>
  makeQuery<ResponseType>(
    'user',
    'GET',
    null,
    (dispatch, data) => {
      dispatch(setUser(data));
    },
    (dispatch) => {
      dispatch(setUser({ id: null, name: null }));
    },
  );
