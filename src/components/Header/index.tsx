import React from 'react';
import { Button } from 'antd';
import { AiOutlineLogout } from 'react-icons/ai';
import { Header as HeaderC } from './styled';

type Props = {
  userId: string | null;
  userName: string | null;
  onLogout: () => void;
};

export const Header: React.FC<Props> = ({ userName, userId, onLogout }) => (
  <HeaderC>
    {userName && userId ? (
      <>
        <h3>
          {userName}({userId.substr(userId.length - 4)})
        </h3>
        <Button type="link" title="Logout" onClick={onLogout}>
          <AiOutlineLogout size={22} />
        </Button>
      </>
    ) : null}
  </HeaderC>
);
