import type i18n from 'i18next';
import type { MessageWithSender } from '@/entities/Message';
import { MESSAGE_SERVICE_TYPES } from '@/const/common';

export const getServiceMessage = (t: (typeof i18n)['t'], { service, fromName }: MessageWithSender) => {
  switch (service) {
    case MESSAGE_SERVICE_TYPES.CHAT_CREATED:
      return t('serviceMessage.chatCreated', { userName: fromName });
    case MESSAGE_SERVICE_TYPES.CHAT_JOINED:
      return t('serviceMessage.joinedChat', { userName: fromName });
    case MESSAGE_SERVICE_TYPES.CHAT_LEFT:
      return t('serviceMessage.leftChat', { userName: fromName });
  }
};
