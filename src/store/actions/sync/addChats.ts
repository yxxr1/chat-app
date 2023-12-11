import { Chat } from '@store/types';
import { createAction } from '@utils/actions';

export const addChats = createAction('ADD_CHATS', (chats: Chat[]) => ({ chats }));
