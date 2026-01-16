import React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import type { MessageWithSender } from '@/entities/Message';
import { Message } from '@/entities/Message';
import { renderComponent } from '@/shared/test';
import { MESSAGE_SERVICE_TYPES } from '@/const/common';
import { THEMES } from '@/shared/styles';
import { store } from '@/store';
import { formatDate, getUserTitle } from './utils';

jest.mock('@/entities/Message/hooks');

const message: MessageWithSender = {
  id: '8PwpNK37lsBNdbWlUcswm',
  text: 'test message text',
  fromId: 'y_ZAWNqKsDgRLKLDu2Qne',
  fromName: 'test_user',
  date: new Date('2024-07-14').valueOf(),
  service: 0,
  index: 0,
};
const serviceMessage = { ...message, service: MESSAGE_SERVICE_TYPES.CHAT_LEFT };

describe('Message entity', () => {
  afterEach(() => {
    cleanup();
  });

  test('utils', () => {
    expect(getUserTitle(message)).toEqual('test_user(2Qne)');
    expect(formatDate(message.date)).toEqual('07/14/2024');
  });

  test('renders content', () => {
    render(<Message message={message} />);
    expect(screen.getByTestId('message__main-container')).toMatchSnapshot();
  });

  test('renders content service message', () => {
    render(<Message message={serviceMessage} />);
    expect(screen.getByText('test_user left chat')).toBeInTheDocument();
  });

  test('render non service, theme light', () => {
    renderComponent(<Message message={message} />, store, 'light');
    expect(screen.getByTestId('message__main-container-text')).toHaveStyle({
      color: THEMES.light['text'],
    });
  });

  test('render non service, theme dark', () => {
    renderComponent(<Message message={message} />, store, 'dark');
    expect(screen.getByTestId('message__main-container-text')).toHaveStyle({
      color: THEMES.dark['text'],
    });
  });
});
