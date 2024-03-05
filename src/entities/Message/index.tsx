import React, { useMemo, memo } from 'react';
import moment from 'moment';
import { Message as MessageType } from '@store/types';
import { getServiceMessage } from '@utils/common';
import { Message as MessageC, MessageUser, MessageText, MessageDateTime, ServiceMessage, Skeleton } from './styled';

type Props = {
  message: MessageType;
};

const _Message: React.FC<Props> = ({ message }) => {
  const userTitle = useMemo(() => `${message.fromName}(${message.fromId.substr(message.fromId.length - 4)})`, [message]);

  if (message.service) {
    return <ServiceMessage>{getServiceMessage(message)}</ServiceMessage>;
  }

  return (
    <MessageC>
      <MessageUser>{userTitle}</MessageUser>
      <MessageText>{message.text}</MessageText>
      <MessageDateTime>{moment(message.date).calendar()}</MessageDateTime>
    </MessageC>
  );
};

const _MessageSkeleton: React.FC = () => {
  const widthIndex = useMemo(() => Math.floor(Math.random() * 10), []);

  return <Skeleton widthIndex={widthIndex} size="small" />;
};

export const MessageSkeleton = memo(_MessageSkeleton);
export const Message = memo(_Message);
