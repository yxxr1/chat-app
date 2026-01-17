import { notification } from 'antd';
import { isObject } from '@/shared/utils/common';
import { getToken, RefreshError, refreshToken } from '../auth';
import type { WSMessage, GetPayloadByType } from './types';

type Callback<Payload = WSMessage['payload']> = (payload: Payload) => void;
type CallbacksMap = {
  [type: string]: Callback[];
};

function assertWSMessage(data: unknown): asserts data is WSMessage {
  if (isObject(data) && typeof data.type === 'string' && isObject(data.payload)) {
    return;
  }

  throw new Error('Incorrect WSMessage');
}

export class WebSocketManager<MessageIncoming extends WSMessage, MessageOutgoing extends WSMessage> {
  _socket: WebSocket | null = null;
  _callbacksByType: CallbacksMap = {};

  connect(url: string, refreshUrl: string, onRefreshError: () => void, onReconnect?: () => void) {
    this._socket = new WebSocket(url + `?accessToken=${getToken()}`);

    this._socket.addEventListener('message', this._onMessage.bind(this));
    this._socket.addEventListener('close', async (e) => {
      if (e.code === 3000) {
        try {
          await refreshToken(refreshUrl);
          this._socket?.close();
          this.connect(url, refreshUrl, onRefreshError, onReconnect);
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

      assertWSMessage(message);

      this._callbacksByType[message.type]?.forEach((callback) => callback(message.payload));
    } catch (e) {
      notification.error({ message: 'server error' });
    }
  }

  sendMessage<T extends MessageOutgoing['type']>(type: T, payload: GetPayloadByType<MessageOutgoing, T>) {
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

  subscribe<T extends MessageIncoming['type']>(type: T, callback: Callback<GetPayloadByType<MessageIncoming, T>>) {
    if (!this._callbacksByType[type]) {
      this._callbacksByType[type] = [];
    }

    this._callbacksByType[type].push(callback);
  }

  unsubscribe<T extends MessageIncoming['type']>(type: T, callback: Callback<GetPayloadByType<MessageIncoming, T>>) {
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
