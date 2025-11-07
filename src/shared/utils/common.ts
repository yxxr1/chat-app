import i18n from 'i18next';
import { MESSAGE_SERVICE_TYPES } from '@/shared/const/common';
import type { Message, Chat } from '@/shared/store/types';

export const getServiceMessage = ({ service, fromName }: Message) => {
  switch (service) {
    case MESSAGE_SERVICE_TYPES.CHAT_JOINED:
      return i18n.t('serviceMessage.joinedChat', { userName: fromName });
    case MESSAGE_SERVICE_TYPES.CHAT_LEFT:
      return i18n.t('serviceMessage.leftChat', { userName: fromName });
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
