import i18n from 'i18next';
import type { Message } from '@/store';
import { MESSAGE_SERVICE_TYPES } from '@/const/common';

export const getServiceMessage = ({ service, fromName }: Message) => {
  switch (service) {
    case MESSAGE_SERVICE_TYPES.CHAT_JOINED:
      return i18n.t('serviceMessage.joinedChat', { userName: fromName });
    case MESSAGE_SERVICE_TYPES.CHAT_LEFT:
      return i18n.t('serviceMessage.leftChat', { userName: fromName });
  }
};
