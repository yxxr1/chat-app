import { useEffect } from 'react';
import { Props } from '@containers/Chat';

export const useJoinChat = ({ currentChat, joinedChatsIds, ...props }: Props) => {
  useEffect(() => {
    if (currentChat) {
      const { id } = currentChat;

      if (!joinedChatsIds.includes(id)) {
        props.joinChat(id);
      }
    }
  }, [currentChat, joinedChatsIds]);
};
