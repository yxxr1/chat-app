import { createAction } from '@utils/actions';
import { Message, Chat } from '@store/types';

export const addMessages = createAction('ADD_MESSAGES', (messages: Message[], id: Chat['id']) => ({ messages, id }));
