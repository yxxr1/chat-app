import moment from 'moment';
import type { Message as MessageType, UserProfile } from '@/store';
import { store } from '@/store';
import { throttledAsyncFnWithArgs } from '@/shared/utils/common';
import { getUserProfile } from './api/getUserProfile';
import type { MessageWithSender } from './types';

export const getUserTitle = (message: MessageWithSender) => `${message.fromName}(${message.fromId.substr(message.fromId.length - 4)})`;

export const formatDate = (date: number) => moment(date).calendar();

const getUser = throttledAsyncFnWithArgs(async (userId: string): Promise<UserProfile> => {
  return new Promise<UserProfile>((resolve, reject) => {
    const user: UserProfile | undefined = store.getState().users[userId];

    if (!user) {
      store.dispatch(
        getUserProfile(
          userId,
          (user) => {
            resolve(user);
          },
          () => reject(),
        ),
      );
    } else {
      resolve(user);
    }
  });
});

export const getMessageWithSender = async (message: MessageType): Promise<MessageWithSender> => {
  try {
    const user = await getUser(message.fromId);

    return { ...message, fromName: user.username };
  } catch {
    return { ...message, fromName: '-UNKNOWN-' };
  }
};
