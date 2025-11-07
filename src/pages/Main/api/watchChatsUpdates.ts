import { makeQuery } from '@/shared/utils/actions';
import type { WatchChats } from '@/shared/types/subscribeData';
import { handleWatchChatsData } from '@/shared/utils/subscribeData';

export const watchChatsUpdates = (signal?: AbortSignal) =>
  makeQuery<WatchChats>(
    'chats-subscribe',
    'GET',
    null,
    (dispatch, data) => {
      handleWatchChatsData(data, dispatch);

      dispatch(watchChatsUpdates(signal));
    },
    null,
    { signal },
  );
