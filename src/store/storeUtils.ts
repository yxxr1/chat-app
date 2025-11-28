import type { Chat, Message } from './types';

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
