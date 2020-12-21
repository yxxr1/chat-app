import {DispatchProp} from "react-redux";
import fetch from "../../../utils/fetch";
import {Message} from "../../interfaces";
import {addMessages} from "../sync/addMessages";

interface ParamsType {
    chatId: string
}
interface ResponseType {
    messages: Message[]
}

export const subscribeChat = (chatId: string, callback: () => any) => {
    return async (dispatch: DispatchProp) => {
        try {
            const params: ParamsType = {chatId}
            let resp = await fetch('subscribe', {
                method: 'post',
                body: JSON.stringify(params)
            });
            if( resp.status === 200 ) {
                let data: ResponseType = await resp.json();
                // @ts-ignore
                dispatch(addMessages(data.messages, chatId));
            }
            if(resp.status >= 200 && resp.status < 300) callback();
        } catch(e){
            console.log(e)
        }
    }
}