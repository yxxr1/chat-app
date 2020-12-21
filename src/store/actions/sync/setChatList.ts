import {Chat} from '../../interfaces'

export interface SetChatListAction {
    type: 'SET_CHAT_LIST',
    list: Chat[]
}

export const setChatList = (list: Chat[]): SetChatListAction => ({type: 'SET_CHAT_LIST', list})