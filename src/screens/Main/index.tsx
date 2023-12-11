import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { State } from '@store/types';
import { Header } from '@components/Header';
import { ChatList } from '@containers/ChatList';
import { Chat } from '@containers/Chat';
import { setUser } from '@actions/async/setUser';
import styles from './styles.module.scss';

type Props = {
  userName: string | null;
  userId: string | null;
  setUser: (userName: string | null) => void;
};

export const _Main: React.FC<Props> = ({ userName, userId, ...props }) => {
  const onLogout = useCallback(() => {
    props.setUser(null);
  }, []);

  return (
    <>
      <Header userName={userName} userId={userId} onLogout={onLogout} />
      <div className={styles.container}>
        <ChatList />
        <Chat />
      </div>
    </>
  );
};

const selector = ({ user }: State) => ({
  userName: user.name,
  userId: user.id,
});

export const Main = connect(selector, { setUser })(_Main);
