import { Edgee } from '../../index';
import {
  PageData,
  UserData,
  TrackData,
  ConsentStatus,
  EdgeeMethod,
  EdgeeConsentMethod,
  QueuedEvent,
  QueuedConsentEvent,
} from './data-collection.types';

const eventQueue: (QueuedEvent<PageData | UserData | TrackData> | QueuedConsentEvent)[] = [];

/**
 * Flushes the event queue and sends all stored events to `window.edgee` if available.
 */
export const flushQueue = () => {
  if (typeof window !== 'undefined' && window.edgee && eventQueue.length > 0) {
    while (eventQueue.length > 0) {
      const event = eventQueue.shift();
      if (!event) return;
      try {
        event.method === 'consent'
          ? (window.edgee as Edgee)[event.method](event.args[0])
          : (window.edgee as Edgee)[event.method](...event.args);
      } catch (e) {
        return e;
      }
    }
  }
};

/**
 * Creates a method that queues events if `window.edgee` is not available yet.
 * @param {keyof Edgee} method - The name of the tracking method (`track`, `user`, `page`).
 * @returns {EdgeeMethod<T>} A function that queues or sends the event.
 */
const createMethod =
  <T extends PageData | UserData | TrackData>(method: Exclude<keyof Edgee, 'consent'>): EdgeeMethod<T> =>
  (arg: T, components?: Record<string, boolean>) => {
    if (typeof window !== 'undefined' && window.edgee) {
      flushQueue();
      window.edgee[method](arg, components);
    } else {
      eventQueue.push({ method, args: [arg, components] });
    }
  };

/**
 * Creates a consent method that queues events if `window.edgee` is not available yet.
 * @returns {EdgeeConsentMethod} A function that queues or sends the consent event.
 */
const createConsentMethod = (): EdgeeConsentMethod => (arg: ConsentStatus) => {
  if (typeof window !== 'undefined' && window.edgee) {
    flushQueue();
    window.edgee.consent(arg);
  } else {
    eventQueue.push({ method: 'consent', args: [arg] });
  }
};

export const track: EdgeeMethod<TrackData> = createMethod<TrackData>('track');
export const user: EdgeeMethod<UserData> = createMethod<UserData>('user');
export const page: EdgeeMethod<PageData> = createMethod<PageData>('page');
export const consent: EdgeeConsentMethod = createConsentMethod();

const EdgeeSDK = { track, user, page, consent };
export default EdgeeSDK;
