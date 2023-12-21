import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Input, InputRef } from 'antd';
import { AiOutlineSend, AiOutlineMessage } from 'react-icons/ai';
import { Chat as ChatType, State, User, UserSettings } from '@store/types';
import { quitChat, publishChat, joinChat } from '@actions/async';
import { setCurrentChat } from '@actions/sync';
import { Message } from '@components/Message';
import { CONNECTION_METHODS } from '@const/settings';
import { wsManager } from '@ws';
import { MAX_MESSAGE_LENGTH } from '@const/limits';
import { useJoinChat } from './use-join-chat';
import styles from './styles.module.scss';

export type Props = {
  currentChat: ChatType | null;
  joinedChatsIds: ChatType['id'][];
  userSettings: UserSettings;
  publishChat: (chatId: string, message: string) => void;
  joinChat: (chatId: string) => void;
  setCurrentChat: (id: string | null) => void;
  quitChat: (chatId: string) => void;
};

const _Chat: React.FC<Props> = ({ currentChat, joinedChatsIds, userSettings, ...props }) => {
  useJoinChat({ currentChat, joinedChatsIds, userSettings, ...props });

  const onQuitClick = useCallback(() => {
    if (currentChat) {
      props.quitChat(currentChat.id);
      props.setCurrentChat(null);
    }
  }, [currentChat]);

  const [messageText, setMessageText] = useState('');

  const onMessageSend = useCallback(() => {
    const message = messageText.trim();

    if (!message.length || message.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    if (currentChat) {
      if (userSettings.connectionMethod === CONNECTION_METHODS.HTTP) {
        props.publishChat(currentChat.id, messageText);
      } else if (userSettings.connectionMethod === CONNECTION_METHODS.WS) {
        wsManager.sendMessage('PUBLISH_MESSAGE', { chatId: currentChat.id, message: messageText });
      }
      setMessageText('');
    }
  }, [messageText, currentChat, userSettings]);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef?.current?.focus();
    setMessageText('');
  }, [currentChat?.id]);

  if (currentChat === null) {
    return (
      <div className={styles['empty-chat']}>
        <AiOutlineMessage size={80} />
        <div className={styles['empty-chat-text']}>Select or create chat to start</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles['chat-header']}>
        <h3 style={{ textAlign: 'center' }}>{currentChat.name}</h3>
        <Button onClick={onQuitClick}>Leave</Button>
      </div>
      <div className={styles.messages}>
        {currentChat.messages
          .slice()
          .reverse()
          .map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </div>
      <form
        className={styles['message-form']}
        onSubmit={(e) => {
          e.preventDefault();
          onMessageSend();
        }}
      >
        <Input
          className={styles['message-input']}
          ref={inputRef}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          autoFocus
          maxLength={MAX_MESSAGE_LENGTH}
        />
        <Button className={styles['send-button']} type="text" onClick={() => onMessageSend()}>
          <AiOutlineSend />
        </Button>
      </form>
    </div>
  );
};

const selector = (state: State) => ({
  currentChat: state.currentChatId ? state.allChats[state.currentChatId] : null,
  joinedChatsIds: state.joinedChatsIds,
  userSettings: (state.user as User).settings,
});

export const Chat = connect(selector, {
  publishChat,
  joinChat,
  setCurrentChat,
  quitChat,
})(_Chat);
