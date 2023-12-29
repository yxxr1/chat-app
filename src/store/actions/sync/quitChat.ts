import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const QUIT_CHAT = 'QUIT_CHAT';

export const quitChat = createAction('QUIT_CHAT', (id: Chat['id']) => ({ id }));
