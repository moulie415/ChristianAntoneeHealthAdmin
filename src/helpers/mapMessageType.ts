import {MessageType} from 'react-chat-elements';
import colors from '../colors';
import {Message} from '../types/Shared';

export const mapMessageType = (message: Message): MessageType => {
  const base = {
    id: message._id,
    text: message.text,
    title: '',
    focus: false,
    date: message.createdAt,
    avatar: message.user?.avatar,
    forwarded: false,
    replyButton: false,
    removeButton: false,
    notch: true,
    retracted: false,
    position: '',
    titleColor: colors.appWhite,
  };
  if (message.system) {
    return {
      ...base,
      status: message.sent ? 'sent' : message.pending ? 'waiting' : 'received',
      type: 'system',
    };
  }
  switch (message.type) {
    case 'audio':
      return {
        ...base,
        status: message.sent
          ? 'sent'
          : message.pending
          ? 'waiting'
          : 'received',
        data: {
          audioURL: message.audio,
        },
        type: 'audio',
      };
    case 'document':
      return {
        ...base,
        status: message.sent
          ? 'sent'
          : message.pending
          ? 'waiting'
          : 'received',
        data: {
          uri: message.document,
          name: message.filename,
        },
        type: 'file',
      };
    case 'image':
      return {
        ...base,
        status: message.sent
          ? 'sent'
          : message.pending
          ? 'waiting'
          : 'received',
        type: 'photo',
        data: {
          uri: message.image || '',
          status: {},
        },
      };
    case 'video':
      return {
        ...base,
        controlsList: '',
        data: {
          videoURL: message.video,
        },
        status: message.sent
          ? 'sent'
          : message.pending
          ? 'waiting'
          : 'received',
        type: 'video',
      };
    default:
      return {
        ...base,
        status: message.sent
          ? 'sent'
          : message.pending
          ? 'waiting'
          : 'received',

        type: 'text',
      };
  }
};
