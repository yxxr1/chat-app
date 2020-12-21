import {DispatchProp} from "react-redux";
import fetch from "../../../utils/fetch";
import {quitChat as quitChatSync} from "../sync/quitCh4t";

interface ParamsType {
    chatId: string
}
interface ResponseType {
    chatId: string
}

export const quitChat = (chatId: string) => {
    return async (dispatch: DispatchProp) => {
        try {
            const params: ParamsType = {chatId}
            let resp = await fetch('quit', {
                method: 'post',
                body: JSON.stringify(params)
            });
            let data: ResponseType = await resp.json();
            // @ts-ignore
            dispatch(quitChatSync(data.chatId));
        } catch(e){
            console.log(e)
        }
    }
}