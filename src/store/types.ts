import {
  addMessages,
  joinChat,
  quitChat,
  setChatList,
  setCurrentChat,
  setUser,
  addChats,
  deleteChats,
  addSubscribedChats,
} from '@actions/sync';
import { CONNECTION_METHODS } from '@const/settings';

export type Chat = {
  id: string;
  name: string;
  messages: (Message | undefined)[];
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
};

export type User = {
  id: string;
  name: string;
  settings: UserSettings;
};

export type State = {
  user: User | null;
  isLoading: boolean;
  allChats: { [chatId: Chat['id']]: Chat };
  joinedChatsIds: Chat['id'][];
  subscribedChatsIds: Chat['id'][];
  currentChatId: Chat['id'] | null;
};

export type Action =
  | ReturnType<typeof addMessages>
  | ReturnType<typeof joinChat>
  | ReturnType<typeof quitChat>
  | ReturnType<typeof setChatList>
  | ReturnType<typeof setCurrentChat>
  | ReturnType<typeof setUser>
  | ReturnType<typeof addChats>
  | ReturnType<typeof deleteChats>
  | ReturnType<typeof addSubscribedChats>;
