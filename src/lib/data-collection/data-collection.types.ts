export type EventComponents = {
  [key: string]: boolean;
};

export type TrackEvent = {
  name: string;
  properties?: Record<string, any>;
  components?: EventComponents;
};

export type UserEvent = {
  user_id: string;
  anonymous_id?: string;
  properties?: Record<string, any>;
  components?: EventComponents;
};

export type PageEvent = {
  name?: string;
  category?: string;
  title?: string;
  url?: string;
  path?: string;
  search?: string;
  keywords?: string[];
  properties?: Record<string, any>;
  components?: EventComponents;
};

export type EdgeeMethod<T> = (arg: T, components?: EventComponents) => void;
