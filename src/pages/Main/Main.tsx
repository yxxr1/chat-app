import React, { useCallback, useState, useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { ChatList } from '@/widgets/ChatList';
import { Chat } from '@/widgets/Chat';
import { SettingsDrawer } from '@/features/SettingsDrawer';
import { AppContextProvider } from '@/shared/context';
import { getChats } from './api/getChats';
import { useSubscribe } from './hooks/use-subscribe';
import styles from './styles.module.scss';

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChats());
  }, []);

  const { sendMessage } = useSubscribe();

  const [isShowSettingsDrawer, setIsShowSettingsDrawer] = useState(false);
  const onSettings = useCallback(() => {
    setIsShowSettingsDrawer(true);
  }, []);
  const onSettingsClose = useCallback(() => {
    setIsShowSettingsDrawer(false);
  }, []);

  return (
    <AppContextProvider value={{ sendMessage }}>
      <div className={styles.container}>
        <ChatList onSettingsClick={onSettings} />
        <Chat />
      </div>
      <SettingsDrawer isOpen={isShowSettingsDrawer} onClose={onSettingsClose} />
    </AppContextProvider>
  );
};
