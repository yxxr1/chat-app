import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChatList } from '@widgets/ChatList';
import { Chat } from '@widgets/Chat';
import { getChats } from '@api';
import { SettingsDrawer } from '@features/SettingsDrawer';
import { useSubscribe } from './use-subscribe';
import styles from './styles.module.scss';

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChats());
  }, []);

  useSubscribe();

  const [isShowSettingsDrawer, setIsShowSettingsDrawer] = useState(false);
  const onSettings = useCallback(() => {
    setIsShowSettingsDrawer(true);
  }, []);
  const onSettingsClose = useCallback(() => {
    setIsShowSettingsDrawer(false);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <ChatList onSettingsClick={onSettings} />
        <Chat />
      </div>
      <SettingsDrawer isOpen={isShowSettingsDrawer} onClose={onSettingsClose} />
    </>
  );
};
