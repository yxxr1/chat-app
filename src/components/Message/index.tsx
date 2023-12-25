import React, { useMemo } from 'react';
import moment from 'moment';
import { Message as MessageType } from '@store/types';
import { getServiceMessage } from '@utils/common';
import { Message as MessageC, UserTitle, MessageDateTime, ServiceMessage } from './styled';

type Props = {
  message: MessageType;
};

export const Message: React.FC<Props> = ({ message }) => {
  const userTitle = useMemo(() => `${message.fromName}(${message.fromId.substr(message.fromId.length - 4)})`, [message]);

  if (message.service) {
    return <ServiceMessage>{getServiceMessage(message)}</ServiceMessage>;
  }

  return (
    <MessageC>
      <UserTitle>{userTitle}</UserTitle>
      <span>{message.text}</span>
      <MessageDateTime>{moment(message.date).calendar()}</MessageDateTime>
    </MessageC>
  );
};
