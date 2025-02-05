export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export enum Consent {
  Pending = 'pending',
  Granted = 'granted',
  Denied = 'denied',
}

export enum EventType {
  Page = 'page',
  User = 'user',
  Track = 'track',
}

export interface Page {
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

export interface User {
  user_id?: string;
  anonymous_id?: string;
  edgee_id: string;
  properties?: Record<string, unknown>;
}

export interface Track {
  name?: string;
  properties?: Record<string, unknown>;
}

export interface Client {
  ip?: string;
  locale?: string;
  accept_language?: string;
  timezone?: string;
  user_agent?: string;
  os_name?: string;
  os_version?: string;
  screen_width?: number;
  screen_height?: number;
  screen_density?: number;
  country_code?: string;
  country_name?: string;
  city?: string;
}

export interface Campaign {
  name?: string;
  source?: string;
  medium?: string;
  term?: string;
  content?: string;
  creative_format?: string;
  marketing_tactic?: string;
}

export interface Session {
  session_id: string;
  previous_session_id?: string;
  session_count: number;
  session_start: boolean;
  first_seen: string;
  last_seen: string;
}

export interface Context {
  page?: Page;
  user?: User;
  client?: Client;
  campaign?: Campaign;
  session?: Session;
}

export type EventData = Page | User | Track;

export interface Event {
  uuid: string;
  timestamp: string;
  event_type: EventType;
  data?: EventData;
  context?: Context;
  components?: Record<string, boolean>;
  from?: string;
  consent?: Consent;
}

export interface DataCollection {
  components?: Record<string, boolean>;
  context?: Context;
  events?: Event[];
  consent?: Consent;
}

export interface Payload {
  data_collection?: DataCollection;
}
