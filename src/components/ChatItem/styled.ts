import styled from 'styled-components';

export const Chat = styled.div<{ isCurrent: boolean }>`
  height: 60px;
  padding: 10px;
  background-color: white;
  border: solid 1px ${({ isCurrent }) => (isCurrent ? '#d3d3d3' : 'white')};
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
  margin-bottom: 4px;

  &:hover {
    border-color: #d3d3d3;
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
