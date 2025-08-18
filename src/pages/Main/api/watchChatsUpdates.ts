import { makeQuery } from '@utils/actions';
import { WatchChats } from '@shared/types/subscribeData';
import { handleWatchChatsData } from '@utils/subscribeData';

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
