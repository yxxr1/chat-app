import {setUser} from "../sync/setUser";
import {DispatchProp} from "react-redux";

import fetch from '../../../utils/fetch'

interface ResponseType {
    name: string | null,
    id: string
}

export const getUser = () => {
    return async (dispatch: DispatchProp) => {
        try {
            let resp = await fetch('username');
            let data: ResponseType = await resp.json();
            // @ts-ignore
            dispatch(setUser(data.name, data.id));
        } catch(e){
            console.log(e)
        }

    }
}