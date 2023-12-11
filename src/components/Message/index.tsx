import React, { useMemo } from 'react';
import moment from 'moment';
import { Message as MessageType } from '@store/types';
import { Message as MessageC, MessageDateTime, ServiceMessage } from './styled';

type Props = {
  message: MessageType;
};

export const Message: React.FC<Props> = ({ message }) => {
  const userTitle = useMemo(() => `${message.fromName}(${message.fromId.substr(message.fromId.length - 4)})`, [message]);

  switch (message.service) {
    case 1:
      return <ServiceMessage>{userTitle} joined chat</ServiceMessage>;
    case 2:
      return <ServiceMessage>{userTitle} left chat</ServiceMessage>;
  }

  return (
    <MessageC>
      <b style={{ userSelect: 'none', cursor: 'pointer' }}>{userTitle}: </b>
      <span>{message.text}</span>
      <MessageDateTime>{moment(message.date).calendar()}</MessageDateTime>
    </MessageC>
  );
};
