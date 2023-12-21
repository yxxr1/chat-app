import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { State, User } from '@store/types';
import { getUser } from '@actions/async';
import { Loader } from '@components/Loader';
import { Auth } from '@screens/Auth';
import { Main } from '@screens/Main';
import styles from './styles.module.scss';

export type Props = {
  user: User | null;
  isLoading: boolean;
  getUser: () => void;
};

const _App: React.FC<Props> = ({ user, isLoading, ...props }) => {
  useEffect(() => {
    props.getUser();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  return user ? <Main /> : <Auth />;
};

const selector = (state: State) => ({
  isLoading: state.isLoading,
  user: state.user,
});

export const App = connect(selector, { getUser })(_App);
