import { makeQuery } from '@utils/actions';
import { Message } from '@store/types';
import { addMessages } from '@actions/sync/addMessages';
import { joinChat as joinChatSync } from '@actions/sync/joinChat';
import { subscribeChat } from '@actions/async/subscribeChat';

interface ResponseType {
  messages: Message[];
}

export const joinChat = (chatId: string) =>
  makeQuery<ResponseType>('join', 'POST', { chatId }, (dispatch, data, getState) => {
    dispatch(addMessages(data.messages, chatId));
    dispatch(joinChatSync(chatId));

    const subscribe = (isFailure?: boolean) => {
      if (!isFailure) {
        const {
          allChats: {
            [chatId]: { messages },
          },
        } = getState();
        const lastMessageId = messages.slice(-1)[0]?.id ?? null;
        dispatch(subscribeChat(chatId, lastMessageId, subscribe));
      }
    };

    subscribe();
  });
