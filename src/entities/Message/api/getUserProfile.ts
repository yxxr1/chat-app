import { makeQuery } from '@/shared/utils/actions';
import type { State, UserProfile } from '@/store';
import { addUser, logoutUser } from '@/store';

export const getUserProfile = (userId: UserProfile['id'], onSuccess: (user: UserProfile) => void, onFailure: (() => void) | null = null) =>
  makeQuery<State, UserProfile>(
    'user-profile',
    'GET',
    { userId },
    (dispatch, user) => {
      dispatch(addUser(user));
      onSuccess(user);
    },
    onFailure,
    logoutUser,
  );
