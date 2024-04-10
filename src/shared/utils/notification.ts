import i18n from 'i18next';
import { Message, Chat } from '@store/types';
import { store } from '@store';

export const requestPermission = () => Notification?.requestPermission();

export const hasNotificationPermission = () => Notification?.permission === 'granted';

export const sendMessageNotification = ({ fromId, fromName, text }: Message, chatId: Chat['id']) => {
  const state = store.getState();
  const { isNotificationsEnabled, isShowNotificationMessageText } = state.user?.settings ?? {};

  if (isNotificationsEnabled && text && fromId !== state.user?.id) {
    const chatName = state.allChats[chatId].name;
    const body = isShowNotificationMessageText ? `${fromName}: ${text}` : i18n.t('notifications.messageFrom', { userName: fromName });
    new Notification(i18n.t('notifications.newMessage', { chatName }), { body });
  }
};
