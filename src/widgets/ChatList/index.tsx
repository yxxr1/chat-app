import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { AiOutlineSetting } from 'react-icons/ai';
import { setCurrentChat } from '@store';
import { Chat } from '@store/types';
import { useTheme } from '@utils/theme';
import { ChatCreateModal } from '@features/ChatCreateModal';
import { ChatListWithFilters } from '@features/ChatListWithFilters';
import { List } from './styled';
import styles from './styles.module.scss';

export interface Props {
  onSettingsClick: () => void;
}

export const ChatList: React.FC<Props> = ({ onSettingsClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onChatClick = useCallback((id: Chat['id']) => {
    dispatch(setCurrentChat(id));
  }, []);

  const [isShowCreateModal, setIsShowCreateModal] = useState(false);

  const onCreateChat = useCallback(() => setIsShowCreateModal(true), []);
  const onCreateChatClose = useCallback(() => setIsShowCreateModal(false), []);

  const theme = useTheme();

  return (
    <>
      <List>
        <div className={styles['action-buttons']}>
          <Button className={styles['settings-button']} type="link" title={t('settings.title')} onClick={onSettingsClick}>
            <AiOutlineSetting color={theme.primary} size={22} />
          </Button>
          <Button className={styles['create-button']} type="primary" onClick={onCreateChat}>
            {t('createChat')}
          </Button>
        </div>

        <ChatListWithFilters onChatClick={onChatClick} />
      </List>

      <ChatCreateModal isOpen={isShowCreateModal} onClose={onCreateChatClose} />
    </>
  );
};
