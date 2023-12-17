import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const joinChat = createAction('JOIN_CHAT', (id: Chat['id']) => ({ id }));
