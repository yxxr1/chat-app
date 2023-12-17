import { COMMON_CONFIG } from '@config/common';
import { WSMessageIncoming, WSMessageOutgoing } from '@ws/types';

type Callback<Payload = any> = (payload: Payload) => void;

class WebSocketManager {
  url: string;
  socket: WebSocket | null = null;
  _callbacksByType: { [type: string]: Callback[] } = {};

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
    const message: WSMessageIncoming = JSON.parse(data);

    if (this._callbacksByType[message.type]) {
      this._callbacksByType[message.type].forEach((callback) => callback(message.payload));
    }
  }

  sendMessage(type: WSMessageOutgoing['type'], payload: WSMessageOutgoing['payload']) {
    const message = JSON.stringify({ type, payload } as WSMessageOutgoing);

    if (this.socket?.readyState === 0) {
      this.socket.addEventListener('open', () => {
        this.socket?.send(message);
      });
    } else if (this.socket?.readyState === 1) {
      this.socket?.send(message);
    }
  }

  subscribe<Payload = object>(type: WSMessageIncoming['type'], callback: Callback<Payload>) {
    if (!this._callbacksByType[type]) {
      this._callbacksByType[type] = [];
    }

    this._callbacksByType[type].push(callback);
  }

  unsubscribe(type: WSMessageIncoming['type'], callback: Callback) {
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
