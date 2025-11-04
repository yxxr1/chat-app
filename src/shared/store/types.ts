import { CONNECTION_METHODS } from '@/shared/const/settings';

export type Chat = {
  id: string;
  name: string;
  messages: (Message | undefined)[];
  joinedCount: number | null;
};

export type Message = {
  id: string;
  text: string | null;
  fromId: string;
  fromName: string;
  date: number;
  service?: number;
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
  name: string;
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
