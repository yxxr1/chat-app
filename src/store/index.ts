import {State, actionTypes} from './interfaces'

const initState: State = {
    userName: undefined,
    allChats: [],
    joinedChats: [],
    currentChat: null
}

const store = (state: State = initState, action: actionTypes): State => {
    //console.log(action, state)
    switch(action.type) {
        case 'SET_USER':
            return Object.assign({}, state, {userName: action.name, userId: action.id})

        case 'SET_CHAT_LIST':
            return Object.assign({}, state, {allChats: action.list})

        case 'JOIN_CHAT':
            let joinedChat  = state.allChats.find(({id}) => id === action.id);
            if(joinedChat) {
                return {
                    ...state,
                    joinedChats: [...state.joinedChats, joinedChat]
                }
            } else return state;

        case 'QUIT_CHAT':
            let joinedChats = state.joinedChats.filter((chat) => {
                const match = chat.id === action.id;
                if(match){
                    chat.messages = [];
                }
                return !match;
            });
            return {
                ...state,
                joinedChats
            }

        case 'SET_CURRENT_CHAT':
            let currentChat;
            if(action.id !== null) {
                currentChat = state.allChats.find(({id}) => id === action.id);
            } else currentChat = null;
            if(currentChat !== undefined) {
                return {
                    ...state,
                    currentChat
                }
            } else return state;

        case 'ADD_MESSAGES':
            let chat  = state.allChats.find(({id}) => id === action.id);
            if(chat === undefined) return state;
            chat.messages = [ ...chat.messages, ...action.messages ];
            return Object.assign({}, state);

        case 'ADD_CHAT':
            return {
                ...state,
                allChats: [...state.allChats, action.chat]
            }

        default:
            return state;
    }
}

export default store;