'use client';

import * as PropTypes from 'prop-types';
import * as React from 'react';


/**
 * Interface representing the Edgee analytics object.
 * Provides methods for tracking page views, user actions, and user identity.
 */
interface Edgee {
  /**
   * Tracks a page view event.
   * @param arg - The event name or an object containing event properties.
   * @param destinations - Optional object specifying destinations for the event.
   */
  page: (arg?: string | object, destinations?: object) => void;

  /**
   * Tracks a custom user action or event.
   * @param arg - The event name or an object containing event properties.
   * @param destinations - Optional object specifying destinations for the event.
   */
  track: (arg?: string | object, destinations?: object) => void;

  /**
   * Identifies a user and associates them with subsequent events.
   * @param arg - A unique identifier for the user or an object containing user properties.
   * @param destinations - Optional object specifying destinations for the event.
   */
  identify: (arg?: string | object, destinations?: object) => void;
}

// Extends the global Window interface to include the Edgee analytics object.
declare global {
  interface Window {
    edgee: Edgee;
  }
}

/**
 * Props for the NextEdgee component.
 */
export type NextEdgeeProps = {
  src: string; // The source URL of the Edgee SDK script.
  dataInline?: boolean; // Determines if the script should be inlined. Defaults to true.
};


/**
 * `NextEdgee` is a React component that injects the Edgee SDK script into the application.
 * It also sets up listeners to track page navigations via `history.pushState` and `history.replaceState`
 * to automatically call the `edgee.page` method, ensuring page views are tracked during SPA navigations.
 *
 * @param {NextEdgeeProps} props - The component props.
 * @param {string} props.src - The source URL of the Edgee SDK script.
 * @param {boolean} [props.dataInline=true] - Determines if the script should be inlined.
 * @returns {JSX.Element} The script element to be injected into the application.
 */
const NextEdgee = ({ src, dataInline }: NextEdgeeProps): JSX.Element => {

  // Default `dataInline` to true if not provided
  dataInline = dataInline ?? true;

  // Create the script element with the provided `src` and `dataInline` values
  const script = (
    <script id={'__EDGEE_SDK__'} async data-inline={dataInline} src={src}></script>
  );

  // Use effect to setup and cleanup the history pushState and replaceState listeners
  React.useEffect((): ReturnType<React.EffectCallback> => {
    // Enhance the history.pushState method to track page navigations
    ((history: History): void => {
      const pushState = history.pushState;
      history.pushState = (...args) => {
        // Call the original pushState method
        const result = pushState.apply(history, args);
        // Track the page view after a short delay to ensure the page has changed
        setTimeout(() => {
          window.edgee.page();
        }, 200);
        return result;
      };
    })((window as Window).history);

    // Enhance the history.replaceState method similarly to track page navigations
    ((history: History): void => {
      const replaceState = history.replaceState;
      history.replaceState = (...args) => {
        // Call the original replaceState method
        const result = replaceState.apply(history, args);
        // Track the page view after a short delay
        setTimeout(() => {
          window.edgee.page();
        }, 200);
        return result;
      };
    })((window as Window).history);

    // Cleanup function to restore the original pushState and replaceState methods
    return (): void => {
      // No cleanup actions are defined here, but this is where you would restore the original methods if needed
    };
  }, []);

  return script;
};

export { NextEdgee };

NextEdgee.propTypes = {
  src: PropTypes.string,
  dataInline: PropTypes.bool
};
