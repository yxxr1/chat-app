import React from 'react'
import styled from "styled-components";


export interface Props {
    isShow: boolean,
    onClose: () => any,
    children: React.ReactNode
}

const CoverC = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    `;
const ContentC = styled.div`
      padding: 20px;
      background-color: darkslategrey;
    `;
export const PopUp = ({isShow, onClose, children}: Props) => {
    return isShow ? (
        <CoverC onClick={onClose}>
            <ContentC onClick={e => e.stopPropagation()}>
            {children}
        </ContentC>
        </CoverC>
    ) : (<></>);
}