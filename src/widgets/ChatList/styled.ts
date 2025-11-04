import styled from 'styled-components';
import { Theme } from '@/shared/utils/theme';

export const List = styled.div<{ theme: Theme }>`
  height: 100%;
  width: 260px;
  padding: 10px 10px 0 10px;
  border-right: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme['background-alt']};
`;
