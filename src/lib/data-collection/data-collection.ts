import { Edgee } from '../../index';
import { Page, User, Track } from './data-collection.types';

type EdgeeMethod<T> = (arg: T, components?: Record<string, boolean>) => void;
interface QueuedEvent<T> {
  method: keyof Edgee;
  args: [T, Record<string, boolean>?];
}

const eventQueue: QueuedEvent<Page | User | Track>[] = [];

/**
 * Flushes the event queue and sends all stored events to `window.edgee` if available.
 */
const flushQueue = () => {
  if (typeof window !== 'undefined' && window.edgee) {
    while (eventQueue.length > 0) {
      const { method, args } = eventQueue.shift()!;
      (window.edgee as Edgee)[method](...args);
    }
  }
};

/**
 * Creates a method that queues events if `window.edgee` is not available yet.
 * @param {keyof Edgee} method - The name of the tracking method (`track`, `user`, or `page`).
 * @returns {EdgeeMethod<T>} A function that queues or sends the event.
 */
const createMethod =
  <T extends Page | User | Track>(method: keyof Edgee): EdgeeMethod<T> =>
  (arg: T, components?: Record<string, boolean>) => {
    if (typeof window !== 'undefined' && window.edgee) {
      window.edgee[method](arg, components);
      flushQueue();
    } else {
      eventQueue.push({ method, args: [arg, components] });
    }
  };

export const track: EdgeeMethod<Track> = createMethod<Track>('track');
export const user: EdgeeMethod<User> = createMethod<User>('user');
export const page: EdgeeMethod<Page> = createMethod<Page>('page');

const EdgeeSDK = { track, user, page };
export default EdgeeSDK;
