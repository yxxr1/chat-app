import { makeQuery } from '@utils/actions';
import { Message, Chat } from '@store/types';
import { addMessages } from '@actions/sync/addMessages';
import { joinChat as joinChatSync } from '@actions/sync/joinChat';

interface ResponseType {
  messages: Message[];
}

export const joinChat = (chatId: Chat['id']) =>
  makeQuery<ResponseType>('join', 'POST', { chatId }, (dispatch, data) => {
    dispatch(joinChatSync(chatId));
    dispatch(addMessages(data.messages, chatId));
  });
