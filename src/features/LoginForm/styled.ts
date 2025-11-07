import styled from 'styled-components';
import type { Theme } from '@/shared/utils/theme';

export const Container = styled.div<{ theme: Theme }>`
  height: 100%;
  background-color: ${({ theme }) => theme.background};
`;
