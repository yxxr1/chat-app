import { makeQuery } from '@utils/actions';
import { addChats } from '@actions/sync/addChats';
import { deleteChats } from '@actions/sync/deleteChats';
import { Chat } from '@store/types';

interface ResponseType {
  chats: Chat[];
  deletedChatsIds: Chat['id'][];
}

export const watchChatsUpdates = (signal: AbortSignal) =>
  makeQuery<ResponseType>(
    'chats?watch=1',
    'GET',
    null,
    (dispatch, data) => {
      if (data.chats.length) {
        dispatch(addChats(data.chats));
      }

      if (data.deletedChatsIds.length) {
        dispatch(deleteChats(data.deletedChatsIds));
      }

      dispatch(watchChatsUpdates(signal));
    },
    null,
    { signal: signal },
  );
