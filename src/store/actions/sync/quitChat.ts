import { createAction } from '@utils/actions';

export const quitChat = createAction('QUIT_CHAT', (id: string) => ({ id }));
