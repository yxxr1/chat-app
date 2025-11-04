import { COMMON_CONFIG } from '@/shared/config/common';

export const getEventSource = <T extends Record<string, unknown>>(path: string, handler: (data: T) => void) => {
  const eventSource = new EventSource(`${COMMON_CONFIG.API_URL}${path}`, { withCredentials: true });

  eventSource.addEventListener('message', (message) => {
    try {
      handler(JSON.parse(message.data));
    } catch {
      console.log('Incorrect SSE event');
    }
  });

  return eventSource;
};
