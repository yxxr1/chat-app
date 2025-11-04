import moment from 'moment';
import { Message as MessageType } from '@/shared/store/types';

export const getUserTitle = (message: MessageType) => `${message.fromName}(${message.fromId.substr(message.fromId.length - 4)})`;

export const formatDate = (date: number) => moment(date).calendar();
