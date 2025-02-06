import { useCallback } from 'react';
import { track, page, user, consent } from './data-collection';
import { ConsentStatus, PageData, TrackData, UserData } from './data-collection.types';

/**
 * Custom hook `useEdgeeDataCollection`
 *
 * Provides access to Edgee's tracking methods: `track`, `page`, `user`, and `consent`.
 * - Returns memoized functions for tracking events and user identification.
 *
 * @returns {{
 *   track: (eventData: TrackData) => void;
 *   page: (pageData: PageData) => void;
 *   user: (userData: UserData) => void;
 *   consent: (consent: ConsentStatus) => void;
 * }} Object containing the tracking functions.
 */
export const useEdgeeDataCollection = () => {
  /**
   * Tracks a page event.
   *
   * @param {PageData} pageData - The page details to be sent to Edgee.
   */
  const pageEvent = useCallback((pageData: PageData) => {
    page(pageData);
  }, []);

  /**
   * Tracks a custom event.
   *
   * @param {TrackData} trackData - The event details to be sent to Edgee.
   */
  const trackEvent = useCallback((trackData: TrackData) => {
    track(trackData);
  }, []);

  /**
   * Identifies a user and associates events with them.
   *
   * @param {UserData} userData - The user data to be sent to Edgee.
   */
  const userEvent = useCallback((userData: UserData) => {
    user(userData);
  }, []);

  /**
   * Set the consent for a user.
   *
   * @param {ConsentStatus} status - The status of the consent for the user.
   */
  const setConsent = useCallback((status: ConsentStatus) => {
    consent(status);
  }, []);

  return { track: trackEvent, page: pageEvent, user: userEvent, consent: setConsent };
};
