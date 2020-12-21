import {DispatchProp} from "react-redux";
import fetch from "../../../utils/fetch";
import {Message} from "../../interfaces";
import {addMessages} from "../sync/addMessages";
import {joinChat as joinChatSync} from "../sync/joinChat";

interface ParamsType {
    chatId: string
}
interface ResponseType {
    messages: Message[]
}

export const joinChat = (chatId: string) => {
    return async (dispatch: DispatchProp) => {
        try {
            const params: ParamsType = {chatId}
            let resp = await fetch('join', {
                method: 'post',
                body: JSON.stringify(params)
            });
            let data: ResponseType = await resp.json();
            // @ts-ignore
            dispatch(addMessages(data.messages, chatId));
            // @ts-ignore
            dispatch(joinChatSync(chatId));
        } catch(e){
            console.log(e)
        }
    }
}