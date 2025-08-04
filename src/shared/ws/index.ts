import { notification } from 'antd';
import { COMMON_CONFIG } from '@config/common';
import { WSMessageIncoming, WSMessageIncomingPayloadByType, WSMessageOutgoing, WSMessageOutgoingPayloadByType } from '@ws/types';

type Callback<Payload = WSMessageIncoming['payload']> = (payload: Payload) => void;

const isObject = (data: unknown): data is Record<string, unknown> => !!data && typeof data === 'object' && !Array.isArray(data);
function assertWSMessageIncoming(data: unknown): asserts data is WSMessageIncoming {
  if (isObject(data) && typeof data.type === 'string' && isObject(data.payload)) {
    return;
  }

  throw new Error('Incorrect WSMessage');
}

class WebSocketManager {
  url: string;
  socket: WebSocket | null = null;
  _callbacksByType: {
    [type: string]: Callback[];
  } = {};

  constructor(url = COMMON_CONFIG.WS_URL) {
    this.url = url;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('message', this._onMessage.bind(this));
  }

  close() {
    this.socket?.close();
    this.socket = null;
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

    if (this.socket?.readyState === WebSocket.CONNECTING) {
      this.socket.addEventListener('open', () => {
        this.socket?.send(message);
      });
    } else if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket?.send(message);
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

export const wsManager = new WebSocketManager();
