import React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import { Message } from '@/entities/Message';
import type { Message as MessageType } from '@/shared/store/types';
import { renderComponent } from '@/shared/test/utils';
import { MESSAGE_SERVICE_TYPES } from '@/shared/const/common';
import { THEMES } from '@/shared/styles/theme';
import { formatDate, getUserTitle } from './utils';

const message: MessageType = {
  id: '8PwpNK37lsBNdbWlUcswm',
  text: 'test message text',
  fromId: 'y_ZAWNqKsDgRLKLDu2Qne',
  fromName: 'test_user',
  date: new Date('2024-07-14').valueOf(),
  service: null,
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
    renderComponent(<Message message={message} />, 'light');
    expect(screen.getByTestId('message__main-container-text')).toHaveStyle({
      color: THEMES.light['text'],
    });
  });

  test('render non service, theme dark', () => {
    renderComponent(<Message message={message} />, 'dark');
    expect(screen.getByTestId('message__main-container-text')).toHaveStyle({
      color: THEMES.dark['text'],
    });
  });
});
