import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const UPDATE_CHAT = 'UPDATE_CHAT';

export const updateChat = createAction(UPDATE_CHAT, (chat: Chat) => ({ chat }));
