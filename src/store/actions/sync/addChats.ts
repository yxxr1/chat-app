import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const addChats = createAction('ADD_CHATS', (chats: Chat[]) => ({ chats }));
