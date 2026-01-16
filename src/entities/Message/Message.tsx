import React, { useMemo, memo } from 'react';
import type { Message as MessageType } from '@/store';
import { getServiceMessage } from '@/i18n/utils';
import { useGetMessageWithSender } from '@/entities/Message/hooks';
import { getUserTitle, formatDate } from './utils';
import { Message as MessageC, MessageUser, MessageText, MessageDateTime, ServiceMessage, Skeleton } from './styled';

type Props = {
  message: MessageType;
};

const _Message: React.FC<Props> = (props) => {
  const message = useGetMessageWithSender(props.message);

  if (!message) return null;

  return message.service ? (
    <ServiceMessage>{getServiceMessage(message)}</ServiceMessage>
  ) : (
    <MessageC data-testid="message__main-container">
      <MessageUser>{getUserTitle(message)}</MessageUser>
      <MessageText data-testid="message__main-container-text">{message.text}</MessageText>
      <MessageDateTime>{formatDate(message.date)}</MessageDateTime>
    </MessageC>
  );
};

const _MessageSkeleton: React.FC = () => {
  const widthIndex = useMemo(() => Math.floor(Math.random() * 10), []);

  return <Skeleton widthIndex={widthIndex} size="small" />;
};

export const MessageSkeleton = memo(_MessageSkeleton);
export const Message = memo(_Message);
