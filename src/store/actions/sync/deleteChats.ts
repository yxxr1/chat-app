import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const DELETE_CHATS = 'DELETE_CHATS';

export const deleteChats = createAction('DELETE_CHATS', (chatsIds: Chat['id'][]) => ({ chatsIds }));
