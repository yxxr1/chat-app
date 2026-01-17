import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Radio } from 'antd';
import type { State, Chat } from '@/store';
import { ChatItem } from '@/entities/ChatItem';
import styles from './styles.module.scss';

interface Props {
  onChatClick: (chatId: Chat['id']) => void;
}

export const ChatListWithFilters: React.FC<Props> = ({ onChatClick }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(0);

  const { allChats, joinedChatsIds, currentChatId } = useSelector<State, Pick<State, 'allChats' | 'joinedChatsIds' | 'currentChatId'>>(
    ({ allChats, joinedChatsIds, currentChatId }) => ({
      allChats,
      joinedChatsIds,
      currentChatId,
    }),
  );
  const list = useMemo<Chat[]>(
    () => (currentTab ? joinedChatsIds.map((chatId) => allChats[chatId]) : Object.values(allChats)),
    [currentTab, joinedChatsIds, allChats],
  );

  return (
    <>
      <Radio.Group className={styles.filter} value={currentTab} onChange={(e) => setCurrentTab(e.target.value)}>
        <Radio.Button value={0}>{t('chatFilter.all')}</Radio.Button>
        <Radio.Button data-testid="ChatListWithFilters_joinedFilter" value={1}>
          {t('chatFilter.joined')}
        </Radio.Button>
      </Radio.Group>
      <div className={styles.container}>
        {list.map((chat) => (
          <ChatItem key={chat.id} chat={chat} isCurrent={currentChatId === chat.id} onClick={onChatClick} />
        ))}
      </div>
    </>
  );
};
