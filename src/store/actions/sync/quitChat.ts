import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const quitChat = createAction('QUIT_CHAT', (id: Chat['id']) => ({ id }));
