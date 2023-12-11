import { makeQuery } from '@utils/actions';

export const publishChat = (chatId: string, message: string) => makeQuery('publish', 'POST', { chatId, message });
