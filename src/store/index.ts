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
  addUser,
} = actions;

export const store = configureStore({ reducer });

export { logoutUser, handleSubscribedChatData, handleWatchChatsData, useAppDispatch, useAppSelector } from './utils';
export type { State, User, UserSettings, UserProfile, Chat, Message } from './types';
