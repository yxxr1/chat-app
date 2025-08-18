import { Dispatch } from 'redux';
import { addChats, addMessages, deleteChats, updateChat } from '@store';
import { SubscribedChat, WatchChats } from '@shared/types/subscribeData';
import { hasNotificationPermission, sendMessageNotification } from '@utils/notification';

export const handleWatchChatsData = (data: WatchChats, dispatch: Dispatch) => {
  if (data.newChats.length) {
    dispatch(addChats(data.newChats));
  }

  if (data.deletedChatsIds.length) {
    dispatch(deleteChats(data.deletedChatsIds));
  }

  data.updatedChats.forEach((chat) => dispatch(updateChat(chat)));
};

export const handleSubscribedChatData = (data: SubscribedChat, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(addMessages({ id: data.chatId, messages: data.messages }));

    if (hasNotificationPermission()) {
      data.messages.forEach((message) => sendMessageNotification(message, data.chatId));
    }
  }
};
