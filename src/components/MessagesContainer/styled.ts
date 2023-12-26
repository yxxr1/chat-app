import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  padding: 10px 0;
  position: relative;
`;

export const GoToBottom = styled.div<{ isShow: boolean }>`
  border-radius: 100px;
  border: solid 1px #777;
  color: #777;
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  opacity: ${({ isShow }) => (isShow ? 0.4 : 0)};
  transition: opacity 100ms;

  &:hover {
    opacity: 1;
  }
`;
