import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import type { State, User } from '@/store';
import { Loader } from '@/shared/ui/Loader';
import { Auth } from '@/pages/Auth';
import { Main } from '@/pages/Main';
import { ThemeProvider, getTheme } from '@/shared/utils/theme';
import '@/i18n';
import '@/types/context';
import { getUser } from './api/getUser';
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
      <ThemeProvider>
        <div className={styles.loading}>
          <Loader />
        </div>
      </ThemeProvider>
    );
  }

  return <ThemeProvider value={getTheme()}>{user ? <Main /> : <Auth />}</ThemeProvider>;
};

const selector = (state: State) => ({
  isLoading: state.isLoading,
  user: state.user,
});

export const App = connect(selector, { getUser })(_App);
