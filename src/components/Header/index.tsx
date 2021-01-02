import React from 'react'
import {connect, DispatchProp} from 'react-redux'
import styled from 'styled-components'

import {State} from "../../store/interfaces";

export interface Props {
    userId?: string,
    userName?: string | null,
}
type ComponentProps =  Props & DispatchProp;

const HeaderC = styled.header`
        height: 60px;
        border-bottom: solid 1px #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: darkslategrey;
        color: #fff;
    `
const _: React.FC<ComponentProps> = (
    {userName, userId, dispatch}:
        ComponentProps
) => {

    return (<HeaderC>
        {userName && userId ? <h3>{userName}({userId.substr(userId.length - 4)})</h3> : <></>}
    </HeaderC>)
}

const mapStateToProps = (state: State): Props => ({
    userId: state.userId,
    userName: state.userName
})

export const Header = connect(mapStateToProps)(_)