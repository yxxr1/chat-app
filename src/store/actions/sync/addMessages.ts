import { Message } from '@store/types';
import { createAction } from '@utils/actions';

export const addMessages = createAction('ADD_MESSAGES', (messages: Message[], id: string) => ({ messages, id }));
