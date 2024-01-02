import styled from 'styled-components';
import { Theme } from '@utils/theme';

export const Message = styled.div`
  padding: 3px 0;
  cursor: pointer;
  word-break: break-word;
  min-height: 25px;

  :hover {
    > *:last-child {
      opacity: 1;
    }
  }
`;

export const MessageUser = styled.div<{ theme: Theme }>`
  font-weight: 600;
  user-select: none;
  cursor: pointer;
  display: inline;
  color: ${({ theme }) => theme.primary};

  &:after {
    content: ': ';
  }
`;

export const MessageText = styled.span<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
`;

export const MessageDateTime = styled.div<{ theme: Theme }>`
  float: right;
  position: relative;
  top: 4px;
  font-size: 8px;
  color: ${({ theme }) => theme['text-alt']};
  user-select: none;
  opacity: 0;
  transition: all 50ms;
`;

export const ServiceMessage = styled.div<{ theme: Theme }>`
  font-style: italic;
  user-select: none;
  text-align: center;
  padding: 8px 0;
  color: ${({ theme }) => theme['text-alt']};
`;
