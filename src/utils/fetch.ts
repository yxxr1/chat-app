import { COMMON_CONFIG } from '@config/common';

export const fetch = (path: string, opt: RequestInit = {}): Promise<Response> =>
  window.fetch(`${COMMON_CONFIG.API_URL}/${path}`, {
    ...opt,
    credentials: 'include',
    headers: {
      ...opt.headers,
      'content-type': 'application/json',
    },
  });
