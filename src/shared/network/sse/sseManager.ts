import { notification } from 'antd';
import { getToken, RefreshError, refreshToken } from '../auth';
import { isObject } from '@/shared/utils/common';
import type { SSEMessage } from './types';

function assertSSEMessageIncoming<T>(data: unknown): asserts data is T {
  if (isObject(data)) {
    return;
  }

  throw new Error('Incorrect SSEMessage');
}

export class SSEManager<T extends SSEMessage> {
  _eventSource: EventSource | null = null;

  constructor(url: string, handler: (data: T) => void, onRefreshError: () => void, getUrlParams?: () => URLSearchParams) {
    this._addEventSource(url, handler, onRefreshError, getUrlParams);
  }

  _addEventSource(url: string, handler: (data: T) => void, onRefreshError: () => void, getUrlParams?: () => URLSearchParams) {
    const parsedUrl = new URL(url);

    if (getUrlParams) {
      const searchParams = getUrlParams();

      for (let [key, value] of searchParams.entries()) {
        parsedUrl.searchParams.set(key, value);
      }
    }

    parsedUrl.searchParams.set('accessToken', getToken());
    this._eventSource = new EventSource(parsedUrl.toString(), { withCredentials: true });

    this._eventSource?.addEventListener('message', this._onMessage.bind(this, handler));
    this._eventSource?.addEventListener('unauthorized', async () => {
      try {
        await refreshToken();
        this._eventSource?.close();
        this._addEventSource(url, handler, onRefreshError, getUrlParams);
      } catch (e) {
        if (e instanceof RefreshError) {
          onRefreshError?.();
        }
      }
    });
  }

  _onMessage(handler: (data: T) => void, { data }: MessageEvent) {
    try {
      const message: unknown = JSON.parse(data);

      assertSSEMessageIncoming<T>(message);

      handler(message);
    } catch (e) {
      notification.error({ message: 'server error' });
    }
  }

  close() {
    this._eventSource?.close();
    this._eventSource = null;
  }
}
