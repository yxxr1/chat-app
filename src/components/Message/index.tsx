import React from 'react'
import {Message as MessageI} from "../../store/interfaces";
import styled from "styled-components";


export interface Props {
    message: MessageI
}

const dup = (s: number) => s < 10 ? '0' + s : s;
const formatDate = (date: Date) =>
    `${date.getFullYear()}-${dup(date.getMonth())}-${dup(date.getDate())} 
    ${dup(date.getHours())}:${dup(date.getMinutes())}:${dup(date.getSeconds())}`

const MessageC = styled.div`
  padding: 3px 0;
`
export function Message({message}: Props) {
    const userTitle = `${message.fromName}(${message.fromId.substr(message.fromId.length - 4)})`
    let content;
    switch(message.service){
        case 1:
            content = <i style={{userSelect: 'none'}}>{userTitle} присоединился к чату</i>
            break;
        case 2:
            content = <i style={{userSelect: 'none'}}>{userTitle} вышел из чата</i>
            break
        default:
            content = <><b style={{userSelect: 'none', cursor: 'pointer'}}>{userTitle}: </b>{message.text}</>
    }

    return (<MessageC title={formatDate(new Date(message.date))}>
        {content}
    </MessageC>)
}