import styled from 'styled-components';
import type { Theme } from '@/shared/styles';

export const Container = styled.div`
  height: 100%;
  position: relative;
`;

export const ListPadding = styled.div`
  height: 10px;
`;

export const GoToBottom = styled.div<{ isShow: boolean; theme: Theme }>`
  border-radius: 100px;
  border: solid 1px ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
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
