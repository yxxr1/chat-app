import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Message as MessageType, Chat as ChatType } from '@/store';
import { getServiceMessage } from '@/i18n/utils';
import { useGetMessageWithSender } from '@/entities/Message';
import { Chat, Title, Message } from './styled';

type Props = {
  chat: ChatType;
  isCurrent: boolean;
  onClick: (chatId: ChatType['id']) => void;
};

const _ChatItem: React.FC<Props> = ({ chat, isCurrent, onClick }) => {
  const { t } = useTranslation();

  const _lastMessage = useMemo<MessageType | null>(() => chat.messages.slice(-1)[0] ?? null, [chat.messages]);
  const lastMessage = useGetMessageWithSender(_lastMessage);

  return (
    <Chat data-testid="chatItem__container" isCurrent={isCurrent} onClick={() => onClick(chat.id)}>
      <Title>{chat.name}</Title>
      {lastMessage && (
        <Message>
          {lastMessage.service !== null ? (
            <i>{getServiceMessage(t, lastMessage)}</i>
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
