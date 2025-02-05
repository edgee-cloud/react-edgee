import { EdgeeMethod, PageEvent, UserEvent } from './data-collection.types';
import { Edgee } from '../../index';

const eventQueue: { method: keyof Edgee; args: any[] }[] = [];

const flushQueue = () => {
  if (typeof window !== 'undefined' && window.edgee) {
    while (eventQueue.length > 0) {
      const { method, args } = eventQueue.shift()!;
      (window.edgee as any)[method](...args);
    }
  }
};

const createMethod =
  <T extends string | object | undefined>(method: keyof Edgee): EdgeeMethod<T> =>
  (arg, components) => {
    if (typeof window !== 'undefined' && window.edgee) {
      window.edgee[method](arg, components);
      flushQueue();
    } else {
      console.warn(`[Edgee] ${method} method called before SDK loaded. Event stored in queue.`);
      eventQueue.push({ method, args: [arg, components] });
    }
  };

export const track: EdgeeMethod<TrackEvent> = createMethod('track');
export const user: EdgeeMethod<UserEvent> = createMethod('user');
export const page: EdgeeMethod<PageEvent> = createMethod('page');

const EdgeeSDK = { track, user, page };
export default EdgeeSDK;
