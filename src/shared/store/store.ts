import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { addMessages as addMessagesUtil } from '@utils/common';
import { State, Chat, Message, User } from './types';

export const initialState: State = {
  isLoading: true,
  user: null,
  allChats: {},
  joinedChatsIds: [],
  subscribedChatsIds: [],
  currentChatId: null,
};

const rootSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload === null) {
        return {
          ...initialState,
          isLoading: false,
        };
      } else {
        state.isLoading = false;

        state.user = {
          ...state.user,
          ...action.payload,
          settings: {
            ...state.user?.settings,
            ...action.payload.settings,
          },
        };
      }
    },
    setChatList: (state, action: PayloadAction<Chat[]>) => {
      state.allChats = action.payload.reduce((acc, chat) => ({ ...acc, [chat.id]: chat }), {});
    },
    joinChat: (state, action: PayloadAction<Chat['id']>) => {
      if (!state.joinedChatsIds.includes(action.payload)) {
        state.joinedChatsIds.push(action.payload);
      }
    },
    addSubscribedChats: (state, action: PayloadAction<Chat['id'][]>) => {
      state.subscribedChatsIds = Array.from(new Set(state.subscribedChatsIds.concat(action.payload)));
    },
    clearSubscribedChats: (state) => {
      state.subscribedChatsIds = [];
    },
    quitChat: (state, action: PayloadAction<Chat['id']>) => {
      if (state.joinedChatsIds.includes(action.payload)) {
        state.joinedChatsIds = state.joinedChatsIds.filter((chatId) => chatId !== action.payload);
        state.subscribedChatsIds = state.subscribedChatsIds.filter((chatId) => chatId !== action.payload);
        state.allChats[action.payload].messages = [];
      }
    },
    setCurrentChat: (state, action: PayloadAction<Chat['id'] | null>) => {
      state.currentChatId = action.payload;
    },
    addMessages: (state, action: PayloadAction<{ id: Chat['id']; messages: Message[] }>) => {
      const { id: chatId, messages: newMessages } = action.payload;

      state.allChats[chatId].messages = addMessagesUtil(state.allChats[chatId]?.messages ?? [], newMessages);
    },
    addChats: (state, action: PayloadAction<Chat[]>) => {
      state.allChats = action.payload.reduce((acc, chat) => ({ ...acc, [chat.id]: chat }), state.allChats);
    },
    deleteChats: (state, action: PayloadAction<Chat['id'][]>) => {
      state.allChats = Object.fromEntries(Object.entries(state.allChats).filter(([id]) => !action.payload.includes(id)));
      state.joinedChatsIds = state.joinedChatsIds.filter((id) => !action.payload.includes(id));
      state.subscribedChatsIds = state.subscribedChatsIds.filter((id) => !action.payload.includes(id));

      if (state.currentChatId && action.payload.includes(state.currentChatId)) {
        state.currentChatId = null;
      }
    },
    updateChat: (state, action: PayloadAction<Partial<Chat> & { id: Chat['id'] }>) => {
      const chat = action.payload;

      state.allChats[chat.id] = {
        ...state.allChats[chat.id],
        ...chat,
        messages: state.allChats[chat.id].messages,
      };
    },
  },
});

export const { reducer, actions } = rootSlice;
