import i18n from 'i18next';
import { MESSAGE_SERVICE_TYPES } from '@/shared/const/common';
import type { Message } from '@/shared/store/types';

export const getServiceMessage = ({ service, fromName }: Message) => {
  switch (service) {
    case MESSAGE_SERVICE_TYPES.CHAT_JOINED:
      return i18n.t('serviceMessage.joinedChat', { userName: fromName });
    case MESSAGE_SERVICE_TYPES.CHAT_LEFT:
      return i18n.t('serviceMessage.leftChat', { userName: fromName });
  }
};

export const isObject = (data: unknown): data is Record<string, unknown> => !!data && typeof data === 'object' && !Array.isArray(data);

export const throttledAsyncFn = <T = unknown>(fn: () => Promise<T>) => {
  let currentCall: Promise<T> | null = null;

  const handler = async () => {
    try {
      return await fn();
    } finally {
      currentCall = null;
    }
  };

  return async () => {
    if (!currentCall) {
      currentCall = handler();
    }

    return currentCall;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttledAsyncFnWithArgs = <T = unknown>(fn: (...args: any[]) => Promise<T>) => {
  const currentCall: Record<string, Promise<T>> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = async (jsonArgsKey: string, ...args: any[]) => {
    try {
      return await fn(...args);
    } finally {
      delete currentCall[jsonArgsKey];
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: any[]) => {
    const jsonArgsKey = JSON.stringify(args);

    if (!currentCall[jsonArgsKey]) {
      currentCall[jsonArgsKey] = handler(jsonArgsKey, ...args);
    }

    return currentCall[jsonArgsKey];
  };
};
