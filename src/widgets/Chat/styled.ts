import styled from 'styled-components';
import { Theme } from '@utils/theme';

export const ChatHeader = styled.div<{ theme: Theme }>`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border: solid 1px ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme['background-alt']};
  border-radius: 8px;
  margin-top: 10px;

  & > div {
    & > h3 {
      margin: 0;
      color: ${({ theme }) => theme.primary};
    }

    & > span {
      color: ${({ theme }) => theme['text-alt']};
      font-size: 14px;
    }
  }
`;

export const Chat = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px;
  flex: 1;
  min-width: 440px;
  background-color: ${({ theme }) => theme.background};
`;

export const EmptyChat = styled.div<{ theme: Theme }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.background};
`;
