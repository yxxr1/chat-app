import { makeQuery } from '@utils/actions';
import { addChats, deleteChats, updateChat } from '@store';
import { Chat } from '@store/types';

interface ResponseType {
  newChats: Chat[];
  deletedChatsIds: Chat['id'][];
  updatedChats: Chat[];
}

export const watchChatsUpdates = (signal: AbortSignal) =>
  makeQuery<ResponseType>(
    'chats-subscribe',
    'GET',
    null,
    (dispatch, data) => {
      if (data.newChats.length) {
        dispatch(addChats(data.newChats));
      }

      if (data.deletedChatsIds.length) {
        dispatch(deleteChats(data.deletedChatsIds));
      }

      data.updatedChats.forEach((chat) => dispatch(updateChat(chat)));

      dispatch(watchChatsUpdates(signal));
    },
    null,
    { signal: signal },
  );
