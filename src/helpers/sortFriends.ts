import * as _ from 'lodash';
import {Message, Profile} from '../types/Shared';

export const sortFriends = (
  profiles: Profile[],
  messages: {[key: string]: {[key: string]: Message}},
  unread: {[key: string]: number} | undefined,
) => {
  return profiles.sort((a, b) => {
    const unreadA = unread?.[a.uid] || 0;
    const unreadB = unread?.[b.uid] || 0;
    const messagesA = Object.values(messages[a.uid] || {});
    const messagesB = Object.values(messages[b.uid] || {});
    const latestA = _.sortBy(messagesA, 'createdAt')?.[messagesA.length - 1]
      ?.createdAt;
    const latestB = _.sortBy(messagesB, 'createdAt')?.[messagesB.length - 1]
      ?.createdAt;
    if (unreadA !== unreadB) {
      return unreadB - unreadA;
    } else if (latestA !== latestB) {
      if (typeof latestB === 'number' && typeof latestA === 'number') {
        return latestB - latestA;
      }
      return latestB?.valueOf() - latestA?.valueOf();
    }
    return 0;
  });
};
