import { makeQuery } from '@/shared/utils/actions';
import { Chat, Message } from '@/shared/store/types';

export const publishChat = (chatId: Chat['id'], message: Message['text']) => makeQuery('publish', 'POST', { chatId, message });
