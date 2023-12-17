import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const addSubscribedChats = createAction('ADD_SUBSCRIBED_CHATS', (chatsIds: Chat['id'][]) => ({ chatsIds }));
