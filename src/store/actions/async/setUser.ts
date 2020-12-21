import {DispatchProp} from "react-redux";

import fetch from '../../../utils/fetch'
import {setUser as setUserSync} from "../sync/setUser";

interface ParamsType {
    name: string
}
interface ResponseType {
    name: string | null,
    id: string
}

export const setUser = (name: string) => {
    return async (dispatch: DispatchProp) => {
        try {
            const params: ParamsType = {name}
            let resp = await fetch('username', {
                method: 'post',
                body: JSON.stringify(params)
            });
            let data: ResponseType = await resp.json();
            // @ts-ignore
            dispatch(setUserSync(data.name, data.id));
        } catch(e){
            console.log(e)
        }

    }
}