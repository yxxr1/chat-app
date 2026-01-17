import type { Message } from '@/store';

export const useGetMessageWithSender = (message: Message) => {
  return message ? { ...message, fromName: 'test_user' } : message;
};
