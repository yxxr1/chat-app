import styled from 'styled-components';

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  border-bottom: solid 1px #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkslategrey;
  color: #fff;

  > .ant-btn {
    position: absolute;
    right: 20px;
  }
`;
