import React, { memo, useMemo } from 'react';
import { Message as MessageType, Chat as ChatType } from '@/shared/store/types';
import { getServiceMessage } from '@/shared/utils/common';
import { Chat, Title, Message } from './styled';

type Props = {
  chat: ChatType;
  isCurrent: boolean;
  onClick: (chatId: ChatType['id']) => void;
};

const _ChatItem: React.FC<Props> = ({ chat, isCurrent, onClick }) => {
  const lastMessage = useMemo<MessageType | null>(() => chat.messages.slice(-1)[0] ?? null, [chat.messages]);

  return (
    <Chat data-testid="chatItem__container" isCurrent={isCurrent} onClick={() => onClick(chat.id)}>
      <Title>{chat.name}</Title>
      {lastMessage && (
        <Message>
          {lastMessage.service ? (
            <i>{getServiceMessage(lastMessage)}</i>
          ) : (
            <>
              <i>{lastMessage.fromName}:</i>
              {` ${lastMessage.text}`}
            </>
          )}
        </Message>
      )}
    </Chat>
  );
};

export const ChatItem = memo(_ChatItem);
