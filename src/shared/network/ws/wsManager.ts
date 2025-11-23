import { notification } from 'antd';
import { isObject } from '@/shared/utils/common';
import { getToken, RefreshError, refreshToken } from '../auth';
import type { WSMessageIncoming, WSMessageIncomingPayloadByType, WSMessageOutgoing, WSMessageOutgoingPayloadByType } from './types';

type Callback<Payload = WSMessageIncoming['payload']> = (payload: Payload) => void;
type CallbacksMap = {
  [type: string]: Callback[];
};

function assertWSMessageIncoming(data: unknown): asserts data is WSMessageIncoming {
  if (isObject(data) && typeof data.type === 'string' && isObject(data.payload)) {
    return;
  }

  throw new Error('Incorrect WSMessage');
}

export class WebSocketManager {
  _socket: WebSocket | null = null;
  _callbacksByType: CallbacksMap = {};

  connect(url: string, onRefreshError: () => void, onReconnect?: () => void) {
    this._socket = new WebSocket(url + `?accessToken=${getToken()}`);

    this._socket.addEventListener('message', this._onMessage.bind(this));
    this._socket.addEventListener('close', async (e) => {
      if (e.code === 3000) {
        try {
          await refreshToken();
          this._socket?.close();
          this.connect(url, onRefreshError, onReconnect);
          onReconnect?.();
        } catch (e) {
          if (e instanceof RefreshError) {
            onRefreshError?.();
          }
        }
      }
    });
  }

  close() {
    this._socket?.close();
    this._socket = null;
    this._callbacksByType = {};
  }

  _onMessage({ data }: MessageEvent) {
    try {
      const message: unknown = JSON.parse(data);

      assertWSMessageIncoming(message);

      this._callbacksByType[message.type]?.forEach((callback) => callback(message.payload));
    } catch (e) {
      notification.error({ message: 'server error' });
    }
  }

  sendMessage<T extends WSMessageOutgoing['type']>(type: T, payload: WSMessageOutgoingPayloadByType[T]) {
    const message = JSON.stringify({ type, payload });

    if (this._socket?.readyState === WebSocket.CONNECTING) {
      this._socket.addEventListener(
        'open',
        () => {
          this._socket?.send(message);
        },
        { once: true },
      );
    } else if (this._socket?.readyState === WebSocket.OPEN) {
      this._socket?.send(message);
    }
  }

  subscribe<T extends WSMessageIncoming['type']>(type: T, callback: Callback<WSMessageIncomingPayloadByType[T]>) {
    if (!this._callbacksByType[type]) {
      this._callbacksByType[type] = [];
    }

    this._callbacksByType[type].push(callback as Callback);
  }

  unsubscribe<T extends WSMessageIncoming['type']>(type: T, callback: Callback<WSMessageIncomingPayloadByType[T]>) {
    if (this._callbacksByType[type]) {
      const callbacks = this._callbacksByType[type].filter((cb) => cb !== callback);

      if (callbacks.length) {
        this._callbacksByType[type] = callbacks;
      } else {
        delete this._callbacksByType[type];
      }
    }
  }
}
