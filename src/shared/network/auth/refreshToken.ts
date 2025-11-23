import { COMMON_CONFIG } from '@/shared/config/common';
import { throttledAsyncFn } from '@/shared/utils/common';
import { setToken } from './token';

export class RefreshError extends Error {
  name = 'RefreshError';
}

const refreshTokenHandler = async () => {
  const refreshResult = await window.fetch(`${COMMON_CONFIG.API_URL}/api/auth/refresh`, { method: 'POST', credentials: 'include' });

  if (refreshResult.status !== 200) {
    throw new RefreshError();
  }

  setToken((await refreshResult.json()).accessToken);
};

export const refreshToken = throttledAsyncFn(refreshTokenHandler);
