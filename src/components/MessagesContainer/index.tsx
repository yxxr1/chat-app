import React, { useRef, useEffect, useState, memo } from 'react';
import { Virtuoso, VirtuosoHandle, StateSnapshot } from 'react-virtuoso';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { Message as MessageType, Chat } from '@store/types';
import { Message } from '@components/Message';
import { MessageSkeleton } from '@components/MessageSkeleton';
import { MESSAGES_PAGE_SIZE } from '@const/limits';
import { DIRECTIONS } from '@actions/async';
import { Container, ListFooter, GoToBottom } from './styled';

export type Props = {
  messages: Chat['messages'];
  chatId: Chat['id'];
  onLoadMore: (lastMessageId: MessageType['id'], direction: (typeof DIRECTIONS)[keyof typeof DIRECTIONS]) => void;
};

const DEFAULT_MESSAGE_HEIGHT = 25;
const BOTTOM_THRESHOLD = 200;

const _MessagesContainer: React.FC<Props> = ({ messages, chatId, onLoadMore }) => {
  const ref = useRef<VirtuosoHandle>(null);
  const [stateByChat, setStateByChat] = useState<Record<Chat['id'], StateSnapshot>>({});

  const [currentChatId, setCurrentChatId] = useState<Chat['id']>(chatId);
  const [currentMessages, setCurrentMessages] = useState<Chat['messages']>(messages);

  const [isShowGoToBottom, setIsShowGoToBottom] = useState<boolean>(false);

  useEffect(() => {
    setCurrentChatId(chatId);

    return () => {
      ref.current?.getState((snapshot) => setStateByChat((state) => ({ ...state, [chatId]: snapshot })));
    };
  }, [chatId]);

  useEffect(() => {
    setCurrentMessages(messages);
  }, [messages]);

  return (
    <Container>
      <Virtuoso
        key={currentChatId}
        ref={ref}
        style={{ height: '100%' }}
        components={{ Footer: () => <ListFooter /> }}
        alignToBottom
        data={currentMessages}
        itemContent={(index, message) => (message ? <Message message={message} /> : <MessageSkeleton />)}
        computeItemKey={(index, message) => message?.id ?? index}
        defaultItemHeight={DEFAULT_MESSAGE_HEIGHT}
        followOutput={(isAtBottom) => (isAtBottom ? 'smooth' : false)}
        firstItemIndex={currentMessages[0]?.index}
        overscan={MESSAGES_PAGE_SIZE / 2}
        atBottomThreshold={BOTTOM_THRESHOLD}
        atBottomStateChange={(isAtBottom) => setIsShowGoToBottom(!isAtBottom)}
        startReached={() => {
          if (currentMessages.length && currentMessages[0] && currentMessages[0].index !== 0) {
            onLoadMore(currentMessages[0].id, DIRECTIONS.PREV);
          }
        }}
        {...(stateByChat[currentChatId] ? {} : { initialTopMostItemIndex: { index: 'LAST', behavior: 'auto' } })}
        restoreStateFrom={stateByChat[currentChatId]}
      />
      <GoToBottom
        isShow={isShowGoToBottom}
        onClick={() => {
          ref.current?.scrollToIndex({
            index: currentMessages.length - 1,
            align: 'end',
          });
        }}
      >
        <AiOutlineArrowDown />
      </GoToBottom>
    </Container>
  );
};

export const MessagesContainer = memo(_MessagesContainer);
