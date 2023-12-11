import { notification } from 'antd';
import { ThunkDispatchType } from '@store/types';
import { fetch } from '@utils/fetch';

export const createAction =
  <Type extends string, PayloadCreator extends (...args: never[]) => ReturnType<PayloadCreator>>(
    type: Type,
    payloadCreator: PayloadCreator,
  ): ((...args: Parameters<PayloadCreator>) => { type: Type; payload: ReturnType<PayloadCreator> }) =>
  (...args) => ({ type, payload: payloadCreator(...args) });

export const makeQuery =
  <ResponseType, ErrorResponseType = { message: string }>(
    path: string,
    method: 'GET' | 'POST',
    body: object | null,
    onSuccess?: ((dispatch: ThunkDispatchType, response: ResponseType) => void) | null,
    onFailure?: (dispatch: ThunkDispatchType, response: ErrorResponseType) => void,
  ): ((dispatch: ThunkDispatchType) => Promise<void>) =>
  async (dispatch) => {
    try {
      const resp = await fetch(path, {
        method,
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      if (resp.status >= 200 && resp.status < 300) {
        onSuccess?.(dispatch, await resp.json());
      } else {
        onFailure?.(dispatch, await resp.json());
      }
    } catch (e) {
      console.error(e);
      notification.error({ message: 'Network error' });
    }
  };
