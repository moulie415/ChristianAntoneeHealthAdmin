import {Message, Profile} from '../types/Shared';

export const sortFriends = (
  profiles: Profile[],
  messages: {[key: string]: {[key: string]: Message}},
  unread: {[key: string]: number} | undefined,
) => {
  const sortMessages = (msgs: Message[]) => {
    return msgs.sort((messageA, messageB) => {
      if (
        typeof messageA.createdAt === 'number' &&
        typeof messageB.createdAt === 'number'
      ) {
        return messageB.createdAt || 0 - messageA.createdAt || 0;
      }
      return (
        messageB.createdAt?.valueOf() || 0 - messageA.createdAt?.valueOf() || 0
      );
    })?.[0]?.createdAt;
  };
  return profiles.sort((a, b) => {
    const unreadA = unread?.[a.uid] || 0;
    const unreadB = unread?.[b.uid] || 0;
    const messagesA = Object.values(messages[a.uid] || {});
    const messagesB = Object.values(messages[b.uid] || {});
    const latestA = sortMessages(messagesA);
    const latestB = sortMessages(messagesB);
    if (unreadA !== unreadB) {
      return unreadB - unreadA;
    } else if (latestA !== latestB) {
      if (typeof latestB === 'number' && typeof latestA === 'number') {
        return latestB - latestA;
      }
      return latestB.valueOf() - latestA.valueOf();
    }
    return 0;
  });
};
