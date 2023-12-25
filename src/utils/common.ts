import { MESSAGE_SERVICE_TYPES } from '@const/common';
import { Message } from '@store/types';

export const getServiceMessage = ({ service, fromName }: Message) => {
  switch (service) {
    case MESSAGE_SERVICE_TYPES.CHAT_JOINED:
      return `${fromName} joined chat`;
    case MESSAGE_SERVICE_TYPES.CHAT_LEFT:
      return `${fromName} left chat`;
  }
};
