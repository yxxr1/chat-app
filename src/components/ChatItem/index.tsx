import React from 'react';
import { Message as MessageType } from '@store/types';
import { getServiceMessage } from '@utils/common';
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
