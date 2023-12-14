import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Input, InputRef } from 'antd';
import { AiOutlineSend, AiOutlineMessage } from 'react-icons/ai';
import { Chat as ChatType, State } from '@store/types';
import { quitChat } from '@actions/async/quitChat';
import { setCurrentChat } from '@actions/sync/setCurrentChat';
import { publishChat } from '@actions/async/publishChat';
import { joinChat } from '@actions/async/joinChat';
import { Message } from '@components/Message';
import { useJoinChat } from './use-join-chat';
import styles from './styles.module.scss';

const MAX_MESSAGE_LENGTH = 1024;

export interface Props {
  currentChat: ChatType | null;
  joinedChatsIds: ChatType['id'][];
  publishChat: (chatId: string, message: string) => void;
  joinChat: (chatId: string) => void;
  setCurrentChat: (id: string | null) => void;
  quitChat: (chatId: string) => void;
}

const _Chat: React.FC<Props> = ({ currentChat, joinedChatsIds, ...props }) => {
  useJoinChat({ currentChat, joinedChatsIds, ...props });

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
      props.publishChat(currentChat.id, messageText);
      setMessageText('');
    }
  }, [messageText, currentChat]);

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
});

export const Chat = connect(selector, {
  publishChat,
  joinChat,
  setCurrentChat,
  quitChat,
})(_Chat);
