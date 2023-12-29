import { MESSAGE_SERVICE_TYPES } from '@const/common';
import { Message, Chat } from '@store/types';

export const getServiceMessage = ({ service, fromName }: Message) => {
  switch (service) {
    case MESSAGE_SERVICE_TYPES.CHAT_JOINED:
      return `${fromName} joined chat`;
    case MESSAGE_SERVICE_TYPES.CHAT_LEFT:
      return `${fromName} left chat`;
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
