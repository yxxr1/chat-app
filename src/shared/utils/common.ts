import type i18n from 'i18next';
import { MESSAGE_SERVICE_TYPES } from '@/shared/const/common';
import type { Message, Chat } from '@/shared/store/types';

export const getServiceMessage = (t: (typeof i18n)['t'], { service, fromName }: Message) => {
  switch (service) {
    case MESSAGE_SERVICE_TYPES.CHAT_CREATED:
      return t('serviceMessage.chatCreated', { userName: fromName });
    case MESSAGE_SERVICE_TYPES.CHAT_JOINED:
      return t('serviceMessage.joinedChat', { userName: fromName });
    case MESSAGE_SERVICE_TYPES.CHAT_LEFT:
      return t('serviceMessage.leftChat', { userName: fromName });
  }
};

export const addMessages = (sourceMessages: Chat['messages'], newMessages: Message[]): Chat['messages'] => {
  const messages: Chat['messages'] = [];
  let minIndex = sourceMessages[0]?.index ?? Infinity;

  sourceMessages.forEach((message) => {
    if (message) {
      messages[message.index] = message;
    }
  });

  newMessages.forEach((message) => {
    if (message.index < minIndex) {
      minIndex = message.index;
    }

    messages[message.index] = message;
  });

  return messages.slice(minIndex);
};
