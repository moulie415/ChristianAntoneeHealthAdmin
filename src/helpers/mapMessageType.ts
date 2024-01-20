import {MessageType} from 'react-chat-elements';
import colors from '../colors';
import {Message} from '../types/Shared';

export const mapMessageType = (message: Message, uid: string): MessageType => {
  const base = {
    id: message._id,
    text: message.text,
    title: '',
    focus: false,
    date: message.createdAt,
    forwarded: false,
    replyButton: false,
    removeButton: false,
    notch: true,
    retracted: false,
    position: uid === message.user?._id ? 'right' : 'left',
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
          status: {},
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
          width: 400,
          height: 225,
          status: {
            download: true,
          },
        },
      };
    case 'video':
      return {
        ...base,
        controlsList: '',
        data: {
          videoURL: message.video,
          width: 400,
          height: 225,
          status: {
            click: true,
            // loading: 0.5,
            download: true, //item === "video",
            error: false,
          },
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
