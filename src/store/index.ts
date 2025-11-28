import { configureStore } from '@reduxjs/toolkit';
import { reducer, actions } from './store';

export const {
  setUser,
  setChatList,
  joinChat,
  addSubscribedChats,
  clearSubscribedChats,
  quitChat,
  setCurrentChat,
  addMessages,
  addChats,
  deleteChats,
  updateChat,
} = actions;

export const store = configureStore({ reducer });

export { logoutUser, handleSubscribedChatData, handleWatchChatsData } from './utils';
export type { State, User, UserSettings, Chat, Message } from './types';
