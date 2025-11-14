import React, { useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Message as MessageType } from '@/shared/store/types';
import { getServiceMessage } from '@/shared/utils/common';
import { getUserTitle, formatDate } from './utils';
import { Message as MessageC, MessageUser, MessageText, MessageDateTime, ServiceMessage, Skeleton } from './styled';

type Props = {
  message: MessageType;
};

const _Message: React.FC<Props> = ({ message }) => {
  const { t } = useTranslation();

  return message.service !== null ? (
    <ServiceMessage>{getServiceMessage(t, message)}</ServiceMessage>
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
