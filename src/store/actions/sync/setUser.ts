import { createAction } from '@utils/actions';
import { User } from '@store/types';

export const SET_USER = 'SET_USER';

export const setUser = createAction(SET_USER, (user: User | null) => ({ user }));
