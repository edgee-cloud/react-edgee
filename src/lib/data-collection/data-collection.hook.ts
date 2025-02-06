import { useCallback } from 'react';
import { track, page, user, consent } from './data-collection';
import { Consent, Page, Track, User } from './data-collection.types';

/**
 * Custom hook `useEdgeeDataCollection`
 *
 * Provides access to Edgee's tracking methods: `track`, `page`, and `user`.
 * - Returns memoized functions for tracking events and user identification.
 *
 * @returns {{
 *   track: (eventData: Track) => void;
 *   page: (pageData: Page) => void;
 *   user: (userData: User) => void;
 *   consent: (consent: Consent) => void;
 * }} Object containing the tracking functions.
 */
export const useEdgeeDataCollection = () => {
  /**
   * Tracks a page event.
   *
   * @param {Page} pageData - The page details to be sent to Edgee.
   */
  const pageEvent = useCallback((pageData: Page) => {
    page(pageData);
  }, []);

  /**
   * Tracks a custom event.
   *
   * @param {Track} eventData - The event details to be sent to Edgee.
   */
  const trackEvent = useCallback((eventData: Track) => {
    track(eventData);
  }, []);

  /**
   * Identifies a user and associates events with them.
   *
   * @param {User} userData - The user data to be sent to Edgee.
   */
  const setUser = useCallback((userData: User) => {
    user(userData);
  }, []);

  const setConsent = useCallback((status: Consent) => {
    consent(status);
  }, []);

  return { track: trackEvent, page: pageEvent, user: setUser, consent: setConsent };
};
