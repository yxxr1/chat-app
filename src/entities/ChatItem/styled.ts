import styled from 'styled-components';
import { Theme } from '@/shared/utils/theme';

export const Chat = styled.div<{ isCurrent: boolean; theme: Theme }>`
  height: 60px;
  padding: 10px;
  background-color: ${({ isCurrent, theme }) => (isCurrent ? theme['background'] : theme['background-alt'])};
  border: solid 1px ${({ isCurrent, theme }) => (isCurrent ? theme.primary : theme.border)};
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
  margin-bottom: 4px;

  &:hover {
    border-color: ${({ theme }) => theme['primary']};
  }
`;

export const Title = styled.div<{ theme: Theme }>`
  height: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme['primary']};
`;

export const Message = styled.div<{ theme: Theme }>`
  height: 20px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme['text-alt']};
`;
