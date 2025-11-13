import { COMMON_CONFIG } from '@/shared/config/common';
import { getToken, setToken } from '@/shared/utils/token';

const STATUS_UNAUTHORIZED = 401;

export class RefreshError extends Error {
  name = 'RefreshError';
}

export const fetch = async (path: string, opt: RequestInit = {}, handleRefresh: boolean = true): Promise<Response> => {
  const token = getToken();

  const result = await window.fetch(`${COMMON_CONFIG.API_URL}/${path}`, {
    ...opt,
    credentials: 'include',
    headers: {
      ...opt.headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      'content-type': 'application/json',
    },
  });

  if (handleRefresh && result.status === STATUS_UNAUTHORIZED) {
    const refreshResult = await window.fetch(`${COMMON_CONFIG.API_URL}/api/auth/refresh`, { method: 'POST', credentials: 'include' });

    if (refreshResult.status !== 200) {
      throw new RefreshError();
    }

    setToken((await refreshResult.json()).accessToken);

    return fetch(path, opt, false);
  }

  return result;
};
