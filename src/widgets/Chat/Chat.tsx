import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { AiOutlineMessage } from 'react-icons/ai';
import { Chat as ChatType, State } from '@/shared/store/types';
import { setCurrentChat } from '@/shared/store';
import { MessagesContainer, Props as MessagesContainerProps } from '@/features/MessagesContainer';
import { MessageInput } from '@/features/MessageInput';
import { MessagesDirections } from '@/shared/const/messages';
import { joinChat } from './api/joinChat';
import { quitChat } from './api/quitChat';
import { getMessages } from './api/getMessages';
import { ChatHeader, Chat as ChatContainer, EmptyChat } from './styled';
import styles from './styles.module.scss';

export type Props = {
  currentChat: ChatType | null;
  joinedChatsIds: ChatType['id'][];
  joinChat: (chatId: string) => void;
  setCurrentChat: (id: string | null) => void;
  quitChat: (chatId: string) => void;
  getMessages: (chatId: ChatType['id'], lastMessageId: ChatType['id'], direction: MessagesDirections) => void;
};

const _Chat: React.FC<Props> = ({ currentChat, joinedChatsIds, ...props }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (currentChat) {
      const { id } = currentChat;

      if (!joinedChatsIds.includes(id)) {
        props.joinChat(id);
      }
    }
  }, [currentChat?.id, joinedChatsIds]);

  const onQuitClick = useCallback(() => {
    if (currentChat) {
      props.quitChat(currentChat.id);
      props.setCurrentChat(null);
    }
  }, [currentChat]);

  const onLoadMoreMessages = useCallback<MessagesContainerProps['onLoadMore']>(
    (lastMessageId, direction) => {
      currentChat && props.getMessages(currentChat.id, lastMessageId, direction);
    },
    [currentChat],
  );

  if (currentChat === null) {
    return (
      <EmptyChat>
        <AiOutlineMessage size={80} />
        <div className={styles['empty-chat-text']}>{t('joinChatToStart')}</div>
      </EmptyChat>
    );
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <div>
          <h3>{currentChat.name}</h3>
          <span>{t('nMembers', { count: currentChat.joinedCount || 0 })}</span>
        </div>
        <Button data-testid="Chat_leaveButton" onClick={onQuitClick}>
          {t('leave')}
        </Button>
      </ChatHeader>
      <MessagesContainer chatId={currentChat.id} messages={currentChat.messages} onLoadMore={onLoadMoreMessages} />
      <MessageInput chatId={currentChat?.id} />
    </ChatContainer>
  );
};

const selector = (state: State) => ({
  currentChat: state.currentChatId ? state.allChats[state.currentChatId] : null,
  joinedChatsIds: state.joinedChatsIds,
});

export const Chat = connect(selector, {
  joinChat,
  setCurrentChat,
  quitChat,
  getMessages,
})(_Chat);
