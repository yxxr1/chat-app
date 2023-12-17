import { createAction } from '@utils/actions';
import { Chat } from '@store/types';

export const setChatList = createAction('SET_CHAT_LIST', (list: Chat[]) => ({ list }));
