import { makeQuery } from '@/shared/utils/actions';
import type { WatchChats } from '@/types/subscribeData';
import { handleWatchChatsData, logoutUser } from '@/store';
import type { State } from '@/store';

export const watchChatsUpdates = (signal?: AbortSignal) =>
  makeQuery<State, WatchChats>(
    'chats-subscribe',
    'GET',
    null,
    (dispatch, data) => {
      handleWatchChatsData(data, dispatch);

      dispatch(watchChatsUpdates(signal));
    },
    null,
    logoutUser,
    { signal },
  );
