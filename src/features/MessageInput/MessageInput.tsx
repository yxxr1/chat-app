import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Input } from 'antd';
import { AiOutlineSend } from 'react-icons/ai';
import type { Chat } from '@/store';
import { useTheme } from '@/shared/utils/theme';
import { MAX_MESSAGE_LENGTH } from '@/const/limits';
import { useAppContext } from '@/shared/context';
import styles from './styles.module.scss';

interface Props {
  chatId: Chat['id'];
}

export const MessageInput: React.FC<Props> = ({ chatId }) => {
  const theme = useTheme();
  const { sendMessage } = useAppContext();

  const [messageText, setMessageText] = useState('');

  const onMessageSend = useCallback(() => {
    const message = messageText.trim();

    if (!message.length || message.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    if (chatId) {
      sendMessage?.(chatId, messageText);
      setMessageText('');
    }
  }, [messageText, chatId]);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef?.current?.focus();
    setMessageText('');
  }, [chatId]);

  return (
    <form
      className={styles['message-form']}
      onSubmit={(e) => {
        e.preventDefault();
        onMessageSend();
      }}
    >
      <Input
        data-testid="MessageInput_input"
        className={styles['message-input']}
        ref={inputRef}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        autoFocus
        maxLength={MAX_MESSAGE_LENGTH}
      />
      <Button data-testid="MessageInput_submit" className={styles['send-button']} type="text" onClick={onMessageSend}>
        <AiOutlineSend color={theme.primary} />
      </Button>
    </form>
  );
};
