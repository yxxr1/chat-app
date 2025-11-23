import { COMMON_CONFIG } from '@/shared/config/common';
import { getToken, refreshToken } from '../auth';

const STATUS_UNAUTHORIZED = 401;

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
    await refreshToken();

    return fetch(path, opt, false);
  }

  return result;
};
