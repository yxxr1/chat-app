import { createAction } from '@utils/actions';

export const setCurrentChat = createAction('SET_CURRENT_CHAT', (id: string | null) => ({ id }));
