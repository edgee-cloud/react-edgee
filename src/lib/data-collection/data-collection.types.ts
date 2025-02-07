import { Edgee } from '../../index';

export interface PageData {
  name?: string;
  category?: string;
  keywords?: string[];
  title?: string;
  url?: string;
  path?: string;
  search?: string;
  referrer?: string;
  properties?: Record<string, unknown>;
}

export interface UserData {
  user_id?: string;
  anonymous_id?: string;
  edgee_id: string;
  properties?: Record<string, unknown>;
}

export interface TrackData {
  name?: string;
  properties?: Record<string, unknown>;
}

export type ConsentStatus = 'granted' | 'denied' | 'pending';

export type EdgeeMethod<T> = (arg: T, components?: Record<string, boolean>) => void;
export type EdgeeConsentMethod = (arg: ConsentStatus) => void;

export type QueuedEvent<T> = {
  method: Exclude<keyof Edgee, 'consent'>;
  args: [T, Record<string, boolean>?];
};

export type QueuedConsentEvent = {
  method: 'consent';
  args: [ConsentStatus];
};
