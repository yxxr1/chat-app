import React, {forwardRef, MutableRefObject} from 'react'
import styled from "styled-components";


export interface Props {
    onChange: (value: string) => any,
    value: string,
    [key: string]: any
}

const InputC = styled.input`
      height: 30px;
      border: none;
      outline: none;
      padding: 0 10px;
    `
export const Input = forwardRef(({value, onChange, ...props}: Props, ref: any) => {
    return (<InputC
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
        ref={ref}
    />)
})