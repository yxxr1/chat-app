import { Chat } from '@store/types';
import { createAction } from '@utils/actions';

export const setChatList = createAction('SET_CHAT_LIST', (list: Chat[]) => ({ list }));
