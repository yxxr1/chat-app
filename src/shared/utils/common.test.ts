import { throttledAsyncFn, throttledAsyncFnWithArgs } from './common';

jest.useFakeTimers();

describe('Common utils', () => {
  test('throttledAsyncFn', async () => {
    const fn = async () => new Promise((res) => setTimeout(() => res(Math.random()), 100));
    const throttledFn = throttledAsyncFn(fn);

    let calls = [throttledFn(), throttledFn()];
    jest.runAllTimers();
    const [call1, call2] = await Promise.all(calls);
    expect(call1).toBe(call2);

    calls = [throttledFn(), throttledFn()];
    jest.runAllTimers();
    const [newCall1, newCall2] = await Promise.all(calls);
    expect(newCall1).not.toBe(call1);
    expect(newCall1).toBe(newCall2);
  });

  test('throttledAsyncFnWithArgs', async () => {
    const fn = async (arg: number) => new Promise((res) => setTimeout(() => res(Math.random() + arg), 100));
    const throttledFn = throttledAsyncFnWithArgs(fn);

    let calls = [throttledFn(1), throttledFn(2), throttledFn(1), throttledFn(2)];
    jest.runAllTimers();
    const [call1, call2, call3, call4] = await Promise.all(calls);
    expect(call1).toBe(call3);
    expect(call1).not.toBe(call2);
    expect(call2).toBe(call4);

    calls = [throttledFn(1), throttledFn(2), throttledFn(1), throttledFn(2)];
    jest.runAllTimers();
    const [newCall1, newCall2, newCall3, newCall4] = await Promise.all(calls);
    expect(newCall1).not.toBe(call1);
    expect(newCall1).toBe(newCall3);
    expect(newCall1).not.toBe(newCall2);
    expect(newCall2).toBe(newCall4);
  });
});
