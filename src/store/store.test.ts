import type { PayloadAction } from '@reduxjs/toolkit';
import { reducer, actions, initialState } from './store';
import type { Chat, Message, State, User } from './types';

describe('reducer test', () => {
  let state: State = initialState;

  const callReducer = <T>(action: PayloadAction<T>) => {
    state = reducer(state, action);
  };

  test('setUser', () => {
    const user: User = {
      id: '1',
      username: 'test_user',
      settings: {
        connectionMethod: 'ws',
        theme: 'light',
        isNotificationsEnabled: true,
        isShowNotificationMessageText: false,
      },
    };
    callReducer(actions.setUser(user));

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);

    const emptyState = reducer(state, actions.setUser(null));

    expect(emptyState).toEqual({ ...initialState, isLoading: false });
  });

  test('setChatList', () => {
    const chats: Chat[] = [
      {
        id: '1',
        name: 'test chat 1',
        messages: [],
        joinedCount: 1,
      },
      {
        id: '2',
        name: 'test chat 2',
        messages: [],
        joinedCount: 1,
      },
    ];
    callReducer(actions.setChatList(chats));

    expect(state.allChats[chats[0].id]).toEqual(chats[0]);
    expect(state.allChats[chats[1].id]).toEqual(chats[1]);
  });

  test('joinChat', () => {
    callReducer(actions.joinChat('1'));
    callReducer(actions.joinChat('2'));
    callReducer(actions.joinChat('2'));

    expect(state.joinedChatsIds[0]).toBe('1');
    expect(state.joinedChatsIds[1]).toBe('2');
    expect(state.joinedChatsIds.length).toBe(2);
  });

  test('addSubscribedChats', () => {
    callReducer(actions.addSubscribedChats(['1', '2', '2']));

    expect(state.subscribedChatsIds.includes('1')).toBeTruthy();
    expect(state.subscribedChatsIds.includes('2')).toBeTruthy();
    expect(state.subscribedChatsIds.length).toBe(2);
  });

  test('addChats', () => {
    const newChats: Chat[] = [
      {
        id: '3',
        name: 'test chat 3',
        messages: [],
        joinedCount: 2,
      },
      {
        id: '4',
        name: 'test chat 4',
        messages: [],
        joinedCount: 2,
      },
    ];

    callReducer(actions.addChats(newChats));

    expect(state.allChats[newChats[0].id]).toEqual(newChats[0]);
    expect(state.allChats[newChats[1].id]).toEqual(newChats[1]);
    expect(Object.keys(state.allChats).length).toBe(4);
  });

  test('addMessages', () => {
    const messages: Message[] = [
      {
        id: '9',
        text: 'test message 3',
        fromId: '1',
        fromName: 'new_test_user',
        date: new Date().valueOf(),
        service: 0,
        index: 8,
      },
      {
        id: '8',
        text: 'test message 2',
        fromId: '1',
        fromName: 'new_test_user',
        date: new Date().valueOf(),
        service: 0,
        index: 7,
      },
    ];
    const oldMessage: Message = {
      id: '6',
      text: 'test message 1',
      fromId: '1',
      fromName: 'new_test_user',
      date: new Date().valueOf(),
      service: 0,
      index: 5,
    };

    callReducer(actions.addMessages({ id: '1', messages }));

    expect(state.allChats['1'].messages[0]).toEqual(messages[1]);
    expect(state.allChats['1'].messages[1]).toEqual(messages[0]);

    callReducer(actions.addMessages({ id: '1', messages: [oldMessage] }));

    expect(state.allChats['1'].messages[0]).toEqual(oldMessage);
    expect(state.allChats['1'].messages[1]).toBeUndefined();
    expect(state.allChats['1'].messages.length).toBe(4);
  });

  test('updateChat', () => {
    callReducer(actions.updateChat({ id: '1', name: 'updated test chat 1', messages: [] }));

    expect(state.allChats['1'].name).toBe('updated test chat 1');
    expect(state.allChats['1'].joinedCount).toBe(1);
    expect(state.allChats['1'].messages.length).not.toBe(0);
  });

  test('setCurrentChat', () => {
    callReducer(actions.setCurrentChat('1'));
    expect(state.currentChatId).toBe('1');
    callReducer(actions.setCurrentChat('2'));
    expect(state.currentChatId).toBe('2');
  });

  test('deleteChats', () => {
    expect(state.currentChatId).toBe('2');
    expect(Object.keys(state.allChats).length).toBe(4);
    expect(state.joinedChatsIds.length).toBe(2);
    expect(state.subscribedChatsIds.length).toBe(2);

    callReducer(actions.deleteChats(['2', '4']));

    expect(Object.keys(state.allChats).length).toBe(2);
    expect(state.allChats['1']).not.toBeUndefined();
    expect(state.joinedChatsIds.length).toBe(1);
    expect(state.joinedChatsIds[0]).toBe('1');
    expect(state.subscribedChatsIds.length).toBe(1);
    expect(state.subscribedChatsIds[0]).toBe('1');
    expect(state.currentChatId).toBeNull();
  });

  test('quitChat', () => {
    expect(state.joinedChatsIds.includes('1')).toBeTruthy();
    expect(state.subscribedChatsIds.includes('1')).toBeTruthy();

    callReducer(actions.quitChat('1'));

    expect(state.joinedChatsIds.includes('1')).toBeFalsy();
    expect(state.subscribedChatsIds.includes('1')).toBeFalsy();
    expect(state.allChats['1'].messages.length).toBe(0);
  });

  test('clearSubscribedChats', () => {
    callReducer(actions.clearSubscribedChats());

    expect(state.subscribedChatsIds).toEqual([]);
  });
});
