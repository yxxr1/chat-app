import React, {useEffect, useState} from 'react'
import {connect, DispatchProp} from 'react-redux'
import styled from 'styled-components'

import {Button} from './components/Button'
import {Loader} from './components/Loader'
import {Input} from './components/Input'
import {State, Chat as ChatI} from "./store/interfaces";
import {getUser} from "./store/actions/async/getUser";
import {setUser} from "./store/actions/async/setUser";
import {ChatList} from "./components/ChatList";
import {Chat} from "./components/Chat";
import {Header} from "./components/Header";
import {quitChat} from "./store/actions/async/quitCh4t";


export interface Props {
    userName?: string | null,
    joinedChats: ChatI[]
}
type ComponentProps =  Props & DispatchProp;

const Container1 = styled.div`
  display: flex;
  height: calc(100% - 70px);
  padding-top: 10px;
`
const Container2 = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const _: React.FC<ComponentProps> = (
    {userName, joinedChats, dispatch}:
        ComponentProps
) => {
    useEffect(() => {
        // @ts-ignore
        dispatch(getUser())

        // window.addEventListener('beforeunload', () => {
        //     joinedChats.forEach(({id}) => {
        //         // @ts-ignore
        //         dispatch(quitChat(id));
        //     })
        // })
    }, []);

    const [ value, setValue ] = useState('');

    switch(userName){
        case undefined:
            return (
                <Container2>
                    <Loader />
                </Container2>
            )
        case null:
            return (
                <Container2
                    // @ts-ignore
                    onSubmit={e => {e.preventDefault(); dispatch(setUser(value))}}
                >
                    <h2>Введите имя</h2>
                    <Input onChange={setValue} value={value} autofocus />
                    <Button
                        title={"OK"}
                    />
                </Container2>
            )
        default:
            return (<>
                <Header />
                <Container1>
                    <ChatList />
                    <Chat />
                </Container1>
            </>)
    }
}

const mapStateToProps = (state: State): Props => ({
    userName: state.userName,
    joinedChats: state.joinedChats
})

export const Wrapper = connect(mapStateToProps)(_)