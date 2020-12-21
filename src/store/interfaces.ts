import {AddMessagesAction} from "./actions/sync/addMessages";
import {JoinChatAction} from "./actions/sync/joinChat";
import {QuitChatAction} from "./actions/sync/quitCh4t";
import {SetChatListAction} from "./actions/sync/setChatList";
import {SetCurrentChatAction} from "./actions/sync/setCurrentChat";
import {SetUserAction} from "./actions/sync/setUser";
import {AddChatAction} from "./actions/sync/addChat";

export interface Chat {
    id: string,
    name: string,
    messages: Message[],

}
export interface Message {
    text: string,
    fromId: string,
    fromName: string,
    date: string,
    service?: number
}
export interface State {
    userId?: string,
    userName?: string | null,
    allChats: Chat[],
    joinedChats: Chat[],
    currentChat: Chat | null
}

export type actionTypes =
    AddMessagesAction |
    JoinChatAction |
    QuitChatAction |
    SetChatListAction |
    SetCurrentChatAction |
    SetUserAction |
    AddChatAction