import { makeQuery } from '@utils/actions';
import { Chat, Message } from '@store/types';

export const publishChat = (chatId: Chat['id'], message: Message['text']) => makeQuery('publish', 'POST', { chatId, message });
