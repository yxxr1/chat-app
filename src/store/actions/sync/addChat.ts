import {Chat} from "../../interfaces";

export interface AddChatAction {
    type: 'ADD_CHAT'
    chat: Chat
}

export const addChat = (chat: Chat): AddChatAction => ({type: 'ADD_CHAT', chat})