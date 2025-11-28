import { throttledAsyncFnWithArgs } from '@/shared/utils/common';
import { setToken } from './token';

export class RefreshError extends Error {
  name = 'RefreshError';
}

const refreshTokenHandler = async (refreshUrl: string) => {
  const refreshResult = await window.fetch(refreshUrl, { method: 'POST', credentials: 'include' });

  if (refreshResult.status !== 200) {
    throw new RefreshError();
  }

  setToken((await refreshResult.json()).accessToken);
};

export const refreshToken = throttledAsyncFnWithArgs(refreshTokenHandler);
