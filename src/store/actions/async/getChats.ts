import {DispatchProp} from "react-redux";
import fetch from "../../../utils/fetch";
import {setChatList} from "../sync/setChatList";
import {Chat} from "../../interfaces";

interface ResponseType {
 chats: Chat[]
}

export const getChats = () => {
    return async (dispatch: DispatchProp) => {
        try {
            let resp = await fetch('chats');
            let data: ResponseType = await resp.json();
            // @ts-ignore
            dispatch(setChatList(data.chats));
        } catch(e){
            console.log(e)
        }
    }
}