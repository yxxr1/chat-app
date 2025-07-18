import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { ChatItem } from '@entities/ChatItem';
import { Chat, Message } from '@store/types';
import { renderComponent } from '@test/utils';
import { THEMES } from '@styles/theme';
import { MESSAGE_SERVICE_TYPES } from '@const/common';

const chat: Chat = {
  id: '1',
  name: 'test chat',
  messages: [
    {
      id: '1',
      text: 'test message',
      fromId: '1',
      fromName: 'testUser',
      date: new Date().valueOf(),
      index: 0,
    },
  ],
  joinedCount: 2,
};

describe('ChatItem renders', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders content', () => {
    renderComponent(<ChatItem chat={chat} isCurrent={false} onClick={() => {}} />);
    expect(screen.getByTestId('chatItem__container')).toMatchSnapshot();
  });

  test('renders content no messages', () => {
    renderComponent(<ChatItem chat={{ ...chat, messages: [] }} isCurrent={false} onClick={() => {}} />);
    expect(screen.getByTestId('chatItem__container')).toMatchSnapshot();
  });

  test('renders content service message', () => {
    renderComponent(
      <ChatItem
        chat={{ ...chat, messages: [{ ...chat.messages[0], service: MESSAGE_SERVICE_TYPES.CHAT_JOINED } as Message] }}
        isCurrent={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId('chatItem__container')).toMatchSnapshot();
  });

  test('render isCurrent=false, theme light', () => {
    renderComponent(<ChatItem chat={chat} isCurrent={false} onClick={() => {}} />, 'light');
    expect(screen.getByTestId('chatItem__container')).toHaveStyle({
      'background-color': THEMES.light['background-alt'],
      border: `solid 1px ${THEMES.light.border}`,
    });
  });

  test('render isCurrent=true, theme light', () => {
    renderComponent(<ChatItem chat={chat} isCurrent={true} onClick={() => {}} />, 'light');
    expect(screen.getByTestId('chatItem__container')).toHaveStyle({
      'background-color': THEMES.light['background'],
      border: `solid 1px ${THEMES.light.primary}`,
    });
  });

  test('render isCurrent=false, theme dark', () => {
    renderComponent(<ChatItem chat={chat} isCurrent={false} onClick={() => {}} />, 'dark');
    expect(screen.getByTestId('chatItem__container')).toHaveStyle({
      'background-color': THEMES.dark['background-alt'],
      border: `solid 1px ${THEMES.dark.border}`,
    });
  });

  test('render isCurrent=true, theme dark', () => {
    renderComponent(<ChatItem chat={chat} isCurrent={true} onClick={() => {}} />, 'dark');
    expect(screen.getByTestId('chatItem__container')).toHaveStyle({
      'background-color': THEMES.dark['background'],
      border: `solid 1px ${THEMES.dark.primary}`,
    });
  });

  test('onClick', () => {
    const handler = jest.fn();
    renderComponent(<ChatItem chat={chat} isCurrent={false} onClick={handler} />);
    fireEvent.click(screen.getByTestId('chatItem__container'));
    fireEvent.click(screen.getByTestId('chatItem__container'));
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(chat.id);
  });
});
