import {Message, Profile} from '../types/Shared';
import {truncate} from './truncate';

export const getLastMessage = (
  uid: string,
  messages: {[key: string]: {[key: string]: Message}},
  yourUid: string,
  friends: {[key: string]: Profile},
): {preview: string; italicize?: boolean; createdAt?: number} => {
  const userMessages = messages[uid];
  if (userMessages) {
    const messagesArr = Object.values(userMessages);
    let message: Message = {
      text: '',
      createdAt: 0,
      type: 'text',
      _id: '',
      user: {_id: ''},
    };
    messagesArr.forEach(msg => {
      if (msg.createdAt > message.createdAt) {
        message = msg;
      }
    });
    let preview = '';

    const sender =
      message.user?._id === yourUid ? 'You' : `${friends[uid].name}`;

    if (message.type === 'audio') {
      preview = `${sender} sent a voice note`;
    } else if (message.type === 'video') {
      preview = `${sender} sent a video`;
    } else if (message.type === 'image') {
      preview = `${sender} sent an image`;
    } else if (message.type === 'document') {
      preview = `${sender} sent a document`;
    } else {
      preview = message.text;
    }
    return {
      preview: truncate(preview, 35),
      italicize:
        message.system ||
        message.type === 'audio' ||
        message.type === 'video' ||
        message.type === 'document' ||
        message.type === 'image',
      createdAt: message.createdAt as number,
    };
  }
  return {preview: 'Beginning of chat', italicize: true};
};
