import { createAction } from '@utils/actions';
import { Message, Chat } from '@store/types';

export const ADD_MESSAGES = 'ADD_MESSAGES';

export const addMessages = createAction('ADD_MESSAGES', (messages: Message[], id: Chat['id']) => ({ messages, id }));
