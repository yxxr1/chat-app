import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const JOIN_CHAT = 'JOIN_CHAT';

export const joinChat = createAction('JOIN_CHAT', (id: Chat['id']) => ({ id }));
