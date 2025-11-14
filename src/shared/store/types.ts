import type { CONNECTION_METHODS } from '@/shared/const/settings';

export type Chat = {
  id: string;
  name: string;
  messages: (Message | undefined)[];
  joinedCount: number | null;
};

export type MessageServiceType = 0 | 1 | 2;

export type Message = {
  id: string;
  text: string | null;
  fromId: string;
  fromName: string;
  date: number;
  service: MessageServiceType | null;
  index: number;
};

export type UserSettings = {
  connectionMethod: (typeof CONNECTION_METHODS)[keyof typeof CONNECTION_METHODS];
  theme: 'light' | 'dark';
  isNotificationsEnabled: boolean;
  isShowNotificationMessageText: boolean;
};

export type User = {
  id: string;
  username: string;
  settings: UserSettings;
};

export interface State {
  isLoading: boolean;
  user: User | null;
  allChats: { [chatId: Chat['id']]: Chat };
  joinedChatsIds: Chat['id'][];
  subscribedChatsIds: Chat['id'][];
  currentChatId: Chat['id'] | null;
}
