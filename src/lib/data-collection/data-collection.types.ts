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
