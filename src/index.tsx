/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable quotes */
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


const NextEdgee = ({ src, dataInline }: NextEdgeeProps): JSX.Element => {

  dataInline = dataInline ?? true;

  /**
   * Edgee SDK script
   */
  const script = (
    <script id={'__EDGEE_SDK__'} async data-inline={dataInline} src={src}></script>
  );


  React.useEffect((): ReturnType<React.EffectCallback> => {
    /**
     * Handle history pushState changes and call edgee.page method
     * @param {History}
     * @returns {void}
     */
    ((history: History): void => {
      const pushState = history.pushState;
      history.pushState = (...args) => {
        setTimeout(() => {
          window.edgee.page();
        }, 200);
        return pushState.apply(history, args);
      };
    })((window as Window).history);

    /**
     * Handle history replaceState changes and call edgee.page method
     * @param {History}
     * @returns {void}
     */
    ((history: History): void => {
      const replaceState = history.replaceState;
      history.replaceState = (...args) => {
        setTimeout(() => {
          window.edgee.page();
        }, 200);
        return replaceState.apply(history, args);
      };
    })((window as Window).history);

    return (): void => {
    };
  }, []);

  return script;
};

export default NextEdgee;

NextEdgee.propTypes = {
  src: PropTypes.string,
  dataInline: PropTypes.bool
};
