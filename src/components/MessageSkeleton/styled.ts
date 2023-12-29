import styled from 'styled-components';
import { Skeleton as AntdSkeleton } from 'antd';

const SIZES = [50, 90, 130, 180, 240, 270, 310, 360, 380, 410];

export const Skeleton = styled(AntdSkeleton.Input)<{ widthIndex: number }>`
  & > span {
    height: 19px !important;
    margin: 3px 0;
    width: ${({ widthIndex }) => SIZES[widthIndex]}px !important;
  }
`;
