import { useEffect, useState } from 'react';
import { getMessageWithSender } from '@/entities/Message/utils';
import type { Message } from '@/store';
import type { MessageWithSender } from '@/entities/Message/types';

export const useGetMessageWithSender = (message: Message | null) => {
  const [messageWithSender, setMessageWithSender] = useState<MessageWithSender | null>(message && { ...message, fromName: '' });

  useEffect(() => {
    if (message) {
      getMessageWithSender(message).then((message) => {
        setMessageWithSender(message);
      });
    } else {
      setMessageWithSender(null);
    }
  }, [message]);

  return messageWithSender;
};
