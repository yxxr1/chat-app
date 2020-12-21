
export interface JoinChatAction {
    type: 'JOIN_CHAT',
    id: string
}

export const joinChat = (id: string): JoinChatAction => ({type: 'JOIN_CHAT', id})