import styled from 'styled-components';
import { Theme } from '@utils/theme';

export const Container = styled.div<{ theme: Theme }>`
  height: 100%;
  background-color: ${({ theme }) => theme.background};
`;
