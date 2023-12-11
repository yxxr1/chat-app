import React from 'react';
import { Message as MessageType } from '@store/types';
import { Chat, Title, Message } from './styled';

type Props = {
  name: string;
  lastMessage: MessageType | null;
  isCurrent: boolean;
  onClick: () => void;
};

export const ChatItem: React.FC<Props> = ({ name, lastMessage, isCurrent, onClick }) => {
  return (
    <Chat isCurrent={isCurrent} onClick={onClick}>
      <Title>{name}</Title>
      {lastMessage && (
        <Message>
          <i>{lastMessage.fromName}:</i> {lastMessage.text}
        </Message>
      )}
    </Chat>
  );
};
