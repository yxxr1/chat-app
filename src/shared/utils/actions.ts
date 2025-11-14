import { notification } from 'antd';
import type { AnyAction } from 'redux';
import type { ThunkDispatch, ThunkAction } from 'redux-thunk';
import type { State } from '@/shared/store/types';
import { fetch, RefreshError } from '@/shared/utils/fetch';
import { setToken } from '@/shared/utils/token';
import { setUser as setUserSync } from '@/shared/store';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: Record<string, any> | null,
    onSuccess?: ((dispatch: ThunkDispatchType, response: ResponseType, getState: () => State) => void) | null,
    onFailure?: ((dispatch: ThunkDispatchType, response: ErrorResponseType, getState: () => State) => void) | null,
    options?: RequestInit | null,
    handleRefresh?: boolean,
  ): ThunkAction<Promise<void>, State, void, AnyAction> =>
  async (dispatch, getState) => {
    try {
      const resp = await fetch(
        'api/' + path + (method === 'GET' && payload ? `?${new URLSearchParams(payload).toString()}` : ''),
        {
          ...options,
          method,
          ...(method === 'POST' && payload ? { body: JSON.stringify(payload) } : {}),
        },
        handleRefresh,
      );

      if (resp.status >= 200 && resp.status < 300) {
        onSuccess?.(dispatch, await resp.json(), getState);
      } else {
        const response = await resp.json();

        if (onFailure !== undefined) {
          onFailure?.(dispatch, response, getState);
        } else {
          notification.error({ message: response?.message });
        }
      }
    } catch (e: unknown) {
      if (e instanceof RefreshError) {
        setToken(undefined);
        dispatch(setUserSync(null));
      } else if ((e as Error).name !== 'AbortError') {
        notification.error({ message: 'Network error' });
      }
    }
  };
