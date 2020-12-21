import React from 'react'
import styled from "styled-components";


export interface Props {
    onClick?: () => any,
    title: string,
    active?: boolean,
    style?: Object
}

export function Button({onClick, title, active, style}: Props) {
    const Button = styled.button`
      background-color: ${active ? 'darkcyan' : '#1c3e3e'};
      color: ${active ? '#fff' : '#fff'};
      min-width: 100px;
      height: 30px;
      border: none;
      outline: none;
      cursor: pointer;
      font-weight: bold;
      
      &:hover {
        opacity: 0.9;
      }
      &:active {
        background-color: darkcyan;
      }
    `

    return (<Button
        style={style}
        onClick={onClick}
    >{title}</Button>)
}