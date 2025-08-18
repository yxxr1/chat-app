import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, InputRef } from 'antd';
import { AiOutlineSend } from 'react-icons/ai';
import { State, Chat } from '@store/types';
import { useTheme } from '@utils/theme';
import { MAX_MESSAGE_LENGTH } from '@const/limits';
import { CONNECTION_METHODS } from '@const/settings';
import { wsManager } from '@ws';
import { publishChat } from './api/publishChat';
import styles from './styles.module.scss';

interface Props {
  chatId: Chat['id'];
}

export const MessageInput: React.FC<Props> = ({ chatId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const connectionMethod = useSelector<State>((state) => state.user?.settings.connectionMethod);

  const [messageText, setMessageText] = useState('');

  const onMessageSend = useCallback(() => {
    const message = messageText.trim();

    if (!message.length || message.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    if (chatId) {
      if (connectionMethod === CONNECTION_METHODS.WS) {
        wsManager.sendMessage('PUBLISH_MESSAGE', { chatId, message: messageText });
      } else {
        // HTTP, SSE
        dispatch(publishChat(chatId, messageText));
      }
      setMessageText('');
    }
  }, [messageText, chatId, connectionMethod]);

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
