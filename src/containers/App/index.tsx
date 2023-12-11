import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { State } from '@store/types';
import { getUser } from '@actions/async/getUser';
import { Loader } from '@components/Loader';
import { Auth } from '@screens/Auth';
import { Main } from '@screens/Main';
import styles from './styles.module.scss';

export type Props = {
  userId: string | null;
  isLoading: boolean;
  getUser: () => void;
};

const _App: React.FC<Props> = ({ userId, isLoading, ...props }) => {
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

  return userId ? <Main /> : <Auth />;
};

const selector = (state: State) => ({
  isLoading: state.isLoading,
  userId: state.user.id,
});

export const App = connect(selector, { getUser })(_App);
