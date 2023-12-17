import { createAction } from '@utils/actions';
import { User } from '@store/types';

export const setUser = createAction('SET_USER', (user: User | null) => ({ user }));
