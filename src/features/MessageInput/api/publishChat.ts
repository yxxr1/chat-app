import { makeQuery } from '@/shared/utils/actions';
import type { Chat, Message, State } from '@/store';
import { logoutUser } from '@/store';

export const publishChat = (chatId: Chat['id'], message: Message['text']) =>
  makeQuery<State, Message>('publish', 'POST', { chatId, message }, undefined, undefined, logoutUser);
