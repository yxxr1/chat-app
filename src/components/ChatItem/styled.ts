import styled from 'styled-components';

export const Chat = styled.div<{ isCurrent: boolean }>`
  height: 60px;
  padding: 10px;
  background-color: ${({ isCurrent }) => (isCurrent ? 'aliceblue' : 'white')};
  cursor: pointer;
  user-select: none;

  &:not(:last-child) {
    border-bottom: solid 1px #eee;
  }

  &:hover {
    background-color: aliceblue;
  }
`;

export const Title = styled.div`
  height: 20px;
  font-weight: 500;
`;

export const Message = styled.div`
  height: 20px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #777;
`;
