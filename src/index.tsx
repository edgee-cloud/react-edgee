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
 * Props for the EdgeeSdk component.
 */
export type EdgeeSdkProps = {
  src: string; // The source URL of the Edgee SDK script.
  dataInline?: boolean; // Determines if the script should be inlined. Defaults to true.
};

/**
 * `EdgeeSdk` is a React component that injects the Edgee SDK script into the application.
 * It also sets up listeners to track page navigations via `history.pushState` and `history.replaceState`
 * to automatically call the `edgee.page` method, ensuring page views are tracked during SPA navigations.
 *
 * @param {EdgeeSdkProps} props - The component props.
 * @param {string} props.src - The source URL of the Edgee SDK script.
 * @param {boolean} [props.dataInline=true] - Determines if the script should be inlined.
 * @returns {JSX.Element} The script element to be injected into the application.
 */
const EdgeeSdk = ({ src, dataInline }: EdgeeSdkProps): JSX.Element => {
  // Default `dataInline` to true if not provided
  dataInline = dataInline ?? true;

  // Create the script element with the provided `src` and `dataInline` values
  const script = <script id={'__EDGEE_SDK__'} async data-inline={dataInline} src={src}></script>;

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

// EdgeeContextObject is an interface representing the context object to display in the page.
export interface EdgeeContextObject {
  page?: Page;
  identify?: Identify;
  destinations?: object;
}
interface Page {
  name?: string;
  category?: string;
  title?: string;
  url?: string;
  path?: string;
  search?: string;
  keywords?: string[];
  properties?: object;
}
interface Identify {
  userId?: string;
  anonymousId?: string;
  properties?: object;
}

/**
 * Props for the EdgeeContextPayload component.
 */
export type EdgeeContextPayloadProps = {
  data: EdgeeContextObject; // The context object to display in the page.
};

const EdgeeContextPayload = ({ data }: EdgeeContextPayloadProps): JSX.Element => {
  let contextPayload = '';
  try {
    // Check if the Edgee context object is valid JSON
    contextPayload = JSON.stringify(data);
  } catch (error) {
    // Log the error if the context object is not valid JSON
    return <></>;
  }
  return (
    <script
      id="__EDGEE_CONTEXT__"
      type="application/json"
      dangerouslySetInnerHTML={{ __html: contextPayload }}
    ></script>
  );
};

export { EdgeeSdk, EdgeeContextPayload };

EdgeeSdk.propTypes = {
  src: PropTypes.string,
  dataInline: PropTypes.bool,
};

EdgeeContextPayload.propTypes = {
  context: PropTypes.object,
};

export default EdgeeSdk;
