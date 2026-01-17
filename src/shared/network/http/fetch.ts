import { getToken, refreshToken } from '../auth';

const STATUS_UNAUTHORIZED = 401;

export const fetch = async (url: string, refreshUrl: string, opt: RequestInit = {}, handleRefresh: boolean = true): Promise<Response> => {
  const token = getToken();

  const result = await window.fetch(url, {
    ...opt,
    credentials: 'include',
    headers: {
      ...opt.headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      'content-type': 'application/json',
    },
  });

  if (handleRefresh && result.status === STATUS_UNAUTHORIZED) {
    await refreshToken(refreshUrl);

    return fetch(url, refreshUrl, opt, false);
  }

  return result;
};
