import styled from 'styled-components';

export const Message = styled.div`
  padding: 3px 0;
  cursor: pointer;
  word-break: break-word;

  :hover {
    > *:last-child {
      opacity: 1;
    }
  }
`;

export const MessageDateTime = styled.div`
  float: right;
  position: relative;
  top: 4px;
  font-size: 8px;
  color: #777;
  user-select: none;
  opacity: 0;
  transition: all 50ms;
`;

export const ServiceMessage = styled.div`
  font-style: italic;
  user-select: none;
  text-align: center;
  padding: 8px 0;
  color: #777;
`;