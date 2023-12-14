import { createAction } from '@utils/actions';
import { State } from '@store/types';

export const setUser = createAction('SET_USER', (user: State['user']) => ({ user }));
