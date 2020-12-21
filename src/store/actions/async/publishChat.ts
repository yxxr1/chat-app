import {DispatchProp} from "react-redux";
import fetch from "../../../utils/fetch";

interface ParamsType {
    chatId: string,
    message: string
}
interface ResponseType {

}

export const publishChat = (chatId: string, message: string) => {
    return async (dispatch: DispatchProp) => {
        try {
            const params: ParamsType = {chatId, message}
            let resp = await fetch('publish', {
                method: 'post',
                body: JSON.stringify(params)
            });
            // let data: ResponseType = await resp.json();
            // @ts-ignore
        } catch(e){
            console.log(e)
        }
    }
}