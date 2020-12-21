import React from 'react'
import {Chat} from "../../store/interfaces";
import styled from "styled-components";


export interface Props {
    chat: Chat,
    current: boolean,
    onClick: (id: string) => any
}

export function ChatItem({chat, current, onClick}: Props) {
    const Chat = styled.div`
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      font-weight: ${current ? 'bold' : 'normal'};
      background-color: ${current ? 'aliceblue' : 'white'};
      cursor: pointer;
      user-select: none;
      
      &:not(:last-child) {
        border-bottom: solid 1px #eee;
      }
      &:hover {
        background-color: aliceblue;
      }
    `

    return (<Chat onClick={() => onClick(chat.id)}>
        {chat.name}
    </Chat>)
}