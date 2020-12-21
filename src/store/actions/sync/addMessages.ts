import {Message} from "../../interfaces";

export interface AddMessagesAction {
    type: 'ADD_MESSAGES'
    messages: Message[],
    id: string
}

export const addMessages = (messages: Message[], id: string): AddMessagesAction => ({type: 'ADD_MESSAGES', messages, id})