import React from 'react'
import styled from "styled-components";


export interface Props {
    onChange: (value: string) => any,
    value: string,
    autofocus?: boolean,
    style?: Object
}

const InputC = styled.input`
      height: 30px;
      border: none;
      outline: none;
      padding: 0 10px;
    `
export function Input({value, onChange, autofocus, style}: Props) {
    // @ts-ignore
    return (<InputC
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autofocus}
        style={style}
    />)
}