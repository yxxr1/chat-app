import React, {useEffect, useState} from 'react'
import {connect, DispatchProp} from 'react-redux'
import styled from 'styled-components'

import {State, Chat} from "../../store/interfaces";
import {getChats} from "../../store/actions/async/getChats";
import {ChatItem} from "../ChatItem";
import {setCurrentChat} from "../../store/actions/sync/setCurrentChat";
import {Button} from "../Button";
import {PopUp} from "../PopUp";
import {Input} from "../Input";
import {createChat} from "../../store/actions/async/createChat";
import {joinChat} from "../../store/actions/async/joinChat";

export interface Props {
    allChats: Chat[],
    joinedChats: Chat[],
    currentChat: Chat | null
}
type ComponentProps =  Props & DispatchProp;

const List = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  height: 100%;
`
const Filter = styled.div`
  margin-top: 10px;
  display: flex;
  
  & > * {
    flex: 1;
  }
`
const _: React.FC<ComponentProps> = (
    {allChats, joinedChats, currentChat, dispatch}:
        ComponentProps
) => {
    useEffect(() => {
        // @ts-ignore
        dispatch(getChats());
    }, []);

    const [ currentTab, setCurrentTab ] = useState(0);
    const [ popup, setPopup ] = useState(false);
    const [ value, setValue ] = useState('');

    const list = currentTab ? joinedChats : allChats;

    const onChatClick = (id: string) => {
        const joined = !!joinedChats.find((chat) => chat.id === id);
        if(!joined){
            // @ts-ignore
            dispatch(joinChat(id));
        }
        dispatch(setCurrentChat(id));
    }
    const onNewChatSubmit = () => {
        // @ts-ignore
        dispatch(createChat(value));
        setPopup(false);
        setValue('');
    }

    return (<>
        <List>
            <Button title={"Создать чат"} onClick={() => setPopup(true)} />
            <Filter>
                <Button title={"Все"} active={currentTab === 0} onClick={() => setCurrentTab(0)}/>
                <Button title={"Участие"} active={currentTab === 1} onClick={() => setCurrentTab(1)}/>
            </Filter>
            {list.map((chat, ind) => (
                <ChatItem
                    key={ind}
                    chat={chat}
                    current={!!currentChat && currentChat.id === chat.id}
                    onClick={onChatClick}
                />
            ))}
        </List>

        <PopUp isShow={popup} onClose={() => setPopup(false)}>
            <form
                onSubmit={e => {e.preventDefault(); onNewChatSubmit()}}
            >
                <h3 style={{color: '#fff', textAlign: 'center'}}>Введите название</h3>
                <Input onChange={setValue} value={value} autoFocus />
                <Button
                    title={"OK"}
                />
            </form>
        </PopUp>
    </>)
}

const mapStateToProps = (state: State): Props => ({
    allChats: state.allChats,
    joinedChats: state.joinedChats,
    currentChat: state.currentChat,
})

export const ChatList = connect(mapStateToProps)(_)