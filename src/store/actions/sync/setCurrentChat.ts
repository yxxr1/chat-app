import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const setCurrentChat = createAction('SET_CURRENT_CHAT', (id: Chat['id'] | null) => ({ id }));
