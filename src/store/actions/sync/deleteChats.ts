import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const deleteChats = createAction('DELETE_CHATS', (chatsIds: Chat['id'][]) => ({ chatsIds }));
