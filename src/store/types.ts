import { addMessages } from '@actions/sync/addMessages';
import { joinChat } from '@actions/sync/joinChat';
import { quitChat } from '@actions/sync/quitChat';
import { setChatList } from '@actions/sync/setChatList';
import { setCurrentChat } from '@actions/sync/setCurrentChat';
import { setUser } from '@actions/sync/setUser';
import { addChats } from '@actions/sync/addChats';
import { deleteChats } from '@actions/sync/deleteChats';

export type Chat = {
  id: string;
  name: string;
  messages: Message[];
};

export type Message = {
  id: string;
  text: string | null;
  fromId: string;
  fromName: string;
  date: string;
  service?: number;
};

export type UserSettings = {
  connectionMethod: 'http' | 'ws';
};

export type User = {
  id: string;
  name: string;
  settings: UserSettings;
};

export type State = {
  user:
    | User
    | {
        id: null;
        name: null;
      };
  isLoading: boolean;
  allChats: { [chatId: Chat['id']]: Chat };
  joinedChatsIds: Chat['id'][];
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
  | ReturnType<typeof deleteChats>;
