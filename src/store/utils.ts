import type { Dispatch } from 'redux';
import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { store, addChats, deleteChats, setUser, updateChat, addMessages } from '@/store';
import type { SubscribedChat, WatchChats } from '@/types/subscribeData';
import { hasNotificationPermission, sendNotification } from '@/shared/utils/notification';
import { setToken } from '@/shared/network';
import type { MessageWithSender } from '@/entities/Message';
import { getMessageWithSender } from '@/entities/Message';
import type { Chat, State } from './types';

export const handleWatchChatsData = (data: WatchChats, dispatch: Dispatch) => {
  if (data.newChats.length) {
    dispatch(addChats(data.newChats));
  }

  if (data.deletedChatsIds.length) {
    dispatch(deleteChats(data.deletedChatsIds));
  }

  data.updatedChats.forEach((chat) => dispatch(updateChat(chat)));
};

const sendMessageNotification = ({ fromId, fromName, text }: MessageWithSender, chatId: Chat['id']) => {
  const state = store.getState();
  const { isNotificationsEnabled, isShowNotificationMessageText } = state.user?.settings ?? {};

  if (isNotificationsEnabled && text && fromId !== state.user?.id) {
    const chatName = state.allChats[chatId].name;
    const body = isShowNotificationMessageText ? `${fromName}: ${text}` : i18n.t('notifications.messageFrom', { userName: fromName });
    sendNotification(i18n.t('notifications.newMessage', { chatName }), body);
  }
};

export const handleSubscribedChatData = (data: SubscribedChat, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(addMessages({ id: data.chatId, messages: data.messages }));

    if (hasNotificationPermission()) {
      Promise.all(data.messages.map(getMessageWithSender)).then((messages) => {
        messages.forEach((message) => sendMessageNotification(message, data.chatId));
      });
    }
  }
};

export const logoutUser = (dispatch: Dispatch) => {
  setToken(undefined);
  dispatch(setUser(null));
};

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<State>();
