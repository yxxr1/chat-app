
export interface QuitChatAction {
    type: 'QUIT_CHAT',
    id: string
}

export const quitChat = (id: string): QuitChatAction => ({type: 'QUIT_CHAT', id})