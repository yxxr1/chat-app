
export interface SetCurrentChatAction {
    type: 'SET_CURRENT_CHAT',
    id: string | null
}

export const setCurrentChat = (id: string | null): SetCurrentChatAction => ({type: 'SET_CURRENT_CHAT', id})