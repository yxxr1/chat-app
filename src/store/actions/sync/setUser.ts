
export interface SetUserAction {
    type: 'SET_USER',
    name: string,
    id: string
}

export const setUser = (name: string, id: string): SetUserAction => ({type: 'SET_USER', name, id})