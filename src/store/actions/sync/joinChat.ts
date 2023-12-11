import { createAction } from '@utils/actions';

export const joinChat = createAction('JOIN_CHAT', (id: string) => ({ id }));
