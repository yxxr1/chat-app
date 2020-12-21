import {DispatchProp} from "react-redux";
import fetch from "../../../utils/fetch";
import {Chat} from "../../interfaces";
import {addChat} from "../sync/addChat";

interface ParamsType {
    name: string
}

export const createChat = (name: string) => {
    return async (dispatch: DispatchProp) => {
        try {
            const params: ParamsType = {name}
            let resp = await fetch('chats', {
                method: 'post',
                body: JSON.stringify(params)
            });
            let data: Chat = await resp.json();
            // @ts-ignore
            dispatch(addChat(data));
        } catch(e){
            console.log(e)
        }
    }
}