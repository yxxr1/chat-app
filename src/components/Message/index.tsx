import React, { useMemo, memo } from 'react';
import moment from 'moment';
import { Message as MessageType } from '@store/types';
import { getServiceMessage } from '@utils/common';
import { Message as MessageC, MessageUser, MessageText, MessageDateTime, ServiceMessage } from './styled';

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

export const Message = memo(_Message);
