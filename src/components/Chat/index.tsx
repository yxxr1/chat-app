import React, {useEffect, useRef, useState} from 'react'
import {connect, DispatchProp} from 'react-redux'
import styled from 'styled-components'

import {Chat as ChatI, Message as MessageI, State} from "../../store/interfaces";
import {Message} from "../Message";
import {Button} from "../Button";
import {quitChat} from "../../store/actions/async/quitCh4t";
import {setCurrentChat} from "../../store/actions/sync/setCurrentChat";
import {getChats} from "../../store/actions/async/getChats";
import {Input} from "../Input";
import {publishChat} from "../../store/actions/async/publishChat";
import {subscribeChat} from "../../store/actions/async/subscribeChat";

export interface Props {
    currentChat: ChatI | null,
    joinedChats: ChatI[],
    messages: MessageI[]
}
type ComponentProps =  Props & DispatchProp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
  height: 100%;
  padding-left: 20px;
`
const Messages = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  padding: 10px 0;
  overflow: scroll;
`
const _: React.FC<ComponentProps> = (
    {currentChat, joinedChats, messages, dispatch}:
        ComponentProps
) => {
    useEffect(() => {
        const subscribe = () => {
            // @ts-ignore
            dispatch(subscribeChat(currentChat.id, subscribe));
        }
        if(currentChat && !joinedChats.includes(currentChat)) {
            subscribe();
        }
    }, [currentChat]);

    const onQuitClick = () => {
        // @ts-ignore
        dispatch(quitChat(currentChat.id));
        dispatch(setCurrentChat(null));
        // @ts-ignore
        dispatch(getChats());
    }
    const onSend = () => {
        if(!value.trim().length) return;
        // @ts-ignore
        dispatch(publishChat(currentChat.id, value));
        setValue('');
    }

    useEffect(() => {
        input?.current?.focus();
    }, [currentChat, messages])

    const [value, setValue] = useState('');
    const input = useRef<HTMLElement>();

    if(currentChat === null) return (<Container />);
    return (<Container>
        <div style={{
            height: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            borderBottom: 'solid 1px #eee'
        }}>
            <h3 style={{textAlign: 'center'}}>{currentChat.name}</h3>
            <Button
                title={"Выйти"}
                onClick={onQuitClick}
            />
        </div>
        <Messages>
            {messages.slice().reverse().map((message, ind) => (
                <Message key={ind} message={message} />
            ))}
        </Messages>
        <form
            style={{height: '30px', display: 'flex'}}
            onSubmit={e => {e.preventDefault(); onSend()}}
        >
            <Input style={{flex: 9}}
                   ref={input}
                   value={value}
                   onChange={setValue}
                   autoFocus
            />
            <Button style={{flex: 1}} title={'->'} />
        </form>
    </Container>)
}

const mapStateToProps = (state: State): Props => ({
    currentChat: state.currentChat,
    joinedChats: state.joinedChats,
    messages: state.currentChat ? state.currentChat.messages : []
})

export const Chat = connect(mapStateToProps)(_)