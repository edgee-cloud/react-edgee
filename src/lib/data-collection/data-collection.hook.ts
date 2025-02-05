import { useCallback } from 'react';
import { track, page, user } from './data-collection';
import { PageEvent, TrackEvent, UserEvent } from './data-collection.types';

/**
 * Custom hook `useEdgeeDataCollection`
 *
 * Provides access to Edgee's tracking methods: `track`, `page`, and `user`.
 * - Automatically tracks a page event when the hook is initialized (if `pageData` is provided).
 * - Returns memoized functions for tracking events and user identification.
 *
 * @returns {{
 *   track: (eventData: TrackEvent) => void;
 *   page: (pageData: PageEvent) => void;
 *   user: (userData: UserEvent) => void;
 * }} Object containing the tracking functions.
 */
export const useEdgeeDataCollection = () => {
  /**
   * Tracks a page event.
   *
   * @param {PageEvent} eventData - The event details to be sent to Edgee.
   */
  const pageEvent = useCallback((pageData: PageEvent) => {
    page(pageData);
  }, []);

  /**
   * Tracks a custom event.
   *
   * @param {TrackEvent} eventData - The event details to be sent to Edgee.
   */
  const trackEvent = useCallback((eventData: TrackEvent) => {
    track(eventData);
  }, []);

  /**
   * Identifies a user and associates events with them.
   *
   * @param {UserEvent} userData - The user data to be sent to Edgee.
   */
  const setUser = useCallback((userData: UserEvent) => {
    user(userData);
  }, []);

  return { track: trackEvent, page: pageEvent, user: setUser };
};
