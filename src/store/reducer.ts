import { State, Action } from './types';

const initState: State = {
  isLoading: true,
  user: null,
  allChats: {},
  joinedChatsIds: [],
  subscribedChatsIds: [],
  currentChatId: null,
};

export const reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case 'SET_USER': {
      if (action.payload.user === null) {
        return {
          ...initState,
          isLoading: false,
        };
      }

      const stateConnectionMethod = state.user?.settings?.connectionMethod;
      const newConnectionMethod = action.payload.user?.settings?.connectionMethod;

      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user,
          settings: {
            ...state.user?.settings,
            ...action.payload.user.settings,
          },
        },
        subscribedChatsIds:
          stateConnectionMethod && newConnectionMethod && stateConnectionMethod !== newConnectionMethod ? [] : state.subscribedChatsIds,
        isLoading: false,
      };
    }
    case 'SET_CHAT_LIST': {
      return {
        ...state,
        allChats: action.payload.list.reduce((acc, chat) => ({ ...acc, [chat.id]: chat }), {}),
      };
    }
    case 'JOIN_CHAT': {
      if (!state.joinedChatsIds.includes(action.payload.id)) {
        return {
          ...state,
          joinedChatsIds: [...state.joinedChatsIds, action.payload.id],
        };
      }

      return state;
    }
    case 'ADD_SUBSCRIBED_CHATS': {
      return {
        ...state,
        subscribedChatsIds: [...state.subscribedChatsIds, ...action.payload.chatsIds],
      };
    }
    case 'QUIT_CHAT': {
      if (state.joinedChatsIds.includes(action.payload.id)) {
        const joinedChatsIds = state.joinedChatsIds.filter((chatId) => chatId !== action.payload.id);
        const subscribedChatsIds = state.subscribedChatsIds.filter((chatId) => chatId !== action.payload.id);

        return {
          ...state,
          allChats: {
            ...state.allChats,
            [action.payload.id]: {
              ...state.allChats[action.payload.id],
              messages: [],
            },
          },
          joinedChatsIds,
          subscribedChatsIds,
        };
      }

      return state;
    }
    case 'SET_CURRENT_CHAT': {
      return {
        ...state,
        currentChatId: action.payload.id,
      };
    }
    case 'ADD_MESSAGES': {
      return {
        ...state,
        allChats: {
          ...state.allChats,
          [action.payload.id]: {
            ...state.allChats[action.payload.id],
            messages: [...state.allChats[action.payload.id].messages, ...action.payload.messages],
          },
        },
      };
    }
    case 'ADD_CHATS': {
      return {
        ...state,
        allChats: action.payload.chats.reduce((acc, chat) => ({ ...acc, [chat.id]: chat }), state.allChats),
      };
    }
    case 'DELETE_CHATS': {
      const allChats = Object.fromEntries(Object.entries(state.allChats).filter(([id]) => !action.payload.chatsIds.includes(id)));

      return {
        ...state,
        allChats,
        joinedChatsIds: state.joinedChatsIds.filter((id) => !action.payload.chatsIds.includes(id)),
        subscribedChatsIds: state.subscribedChatsIds.filter((id) => !action.payload.chatsIds.includes(id)),
        currentChatId: state.currentChatId && action.payload.chatsIds.includes(state.currentChatId) ? null : state.currentChatId,
      };
    }

    default:
      return state;
  }
};
