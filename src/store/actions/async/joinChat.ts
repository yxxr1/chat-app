import { makeQuery } from '@utils/actions';
import { Message } from '@store/types';
import { addMessages } from '@actions/sync/addMessages';
import { joinChat as joinChatSync } from '@actions/sync/joinChat';
import { subscribeChat } from '@actions/async/subscribeChat';

interface ResponseType {
  messages: Message[];
}

export const joinChat = (chatId: string) =>
  makeQuery<ResponseType>('join', 'POST', { chatId }, (dispatch, data) => {
    dispatch(addMessages(data.messages, chatId));
    dispatch(joinChatSync(chatId));

    const subscribe = (isFailure?: boolean) => {
      if (!isFailure) {
        dispatch(subscribeChat(chatId, subscribe));
      }
    };

    subscribe();
  });
