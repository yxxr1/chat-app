import { notification } from 'antd';
import type { AnyAction, Dispatch } from 'redux';
import type { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { fetch, RefreshError } from '@/shared/network';
import { COMMON_CONFIG, REFRESH_URL } from '@/config/common';

export const createAction =
  <Type extends string, PayloadCreator extends (...args: never[]) => ReturnType<PayloadCreator>>(
    type: Type,
    payloadCreator: PayloadCreator,
  ): ((...args: Parameters<PayloadCreator>) => { type: Type; payload: ReturnType<PayloadCreator> }) =>
  (...args) => ({ type, payload: payloadCreator(...args) });

export const makeQuery =
  <State, ResponseType, ErrorResponseType = { message: string }>(
    path: string,
    method: 'GET' | 'POST',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: Record<string, any> | null,
    onSuccess?: ((dispatch: ThunkDispatch<State, void, AnyAction>, response: ResponseType, getState: () => State) => void) | null,
    onFailure?: ((dispatch: ThunkDispatch<State, void, AnyAction>, response: ErrorResponseType, getState: () => State) => void) | null,
    onRefreshError?: (dispatch: Dispatch) => void,
    options?: RequestInit | null,
    handleRefresh?: boolean,
  ): ThunkAction<Promise<void>, State, void, AnyAction> =>
  async (dispatch, getState) => {
    try {
      const urlPath = 'api/' + path + (method === 'GET' && payload ? `?${new URLSearchParams(payload).toString()}` : '');
      const resp = await fetch(
        `${COMMON_CONFIG.API_URL}/${urlPath}`,
        REFRESH_URL,
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
        onRefreshError?.(dispatch);
      } else if ((e as Error).name !== 'AbortError') {
        notification.error({ message: 'Network error' });
      }
    }
  };
