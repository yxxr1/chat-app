import { notification } from 'antd';
import { AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { State } from '@store/types';
import { fetch } from '@utils/fetch';

type ThunkDispatchType = ThunkDispatch<State, void, AnyAction>;

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
    onSuccess?: ((dispatch: ThunkDispatchType, response: ResponseType, getState: () => State) => void) | null,
    onFailure?: ((dispatch: ThunkDispatchType, response: ErrorResponseType, getState: () => State) => void) | null,
    options?: RequestInit | null,
  ): ThunkAction<Promise<void>, State, void, AnyAction> =>
  async (dispatch, getState) => {
    try {
      const resp = await fetch(path, {
        ...options,
        method,
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      if (resp.status >= 200 && resp.status < 300) {
        onSuccess?.(dispatch, await resp.json(), getState);
      } else {
        onFailure?.(dispatch, await resp.json(), getState);
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        notification.error({ message: 'Network error' });
      }
    }
  };
