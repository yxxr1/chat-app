import React from 'react';
import { Button } from 'antd';
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { Header as HeaderC, Buttons } from './styled';

type Props = {
  userId: string | null;
  userName: string | null;
  onLogout: () => void;
  onSettings: () => void;
};

export const Header: React.FC<Props> = ({ userName, userId, onLogout, onSettings }) => (
  <HeaderC>
    {userName && userId ? (
      <>
        <h3>
          {userName}({userId.substr(userId.length - 4)})
        </h3>
        <Buttons>
          <Button type="link" title="Settings" onClick={onSettings}>
            <AiOutlineSetting size={22} />
          </Button>
          <Button type="link" title="Logout" onClick={onLogout}>
            <AiOutlineLogout size={22} />
          </Button>
        </Buttons>
      </>
    ) : null}
  </HeaderC>
);
