// deno-ts-ignore-file
// deno-lint-ignore-file
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable quotes */

import * as PropTypes from 'prop-types';
import * as React from 'react';

export type NextEdgeeProps = {
  src: string;
  dataInline?: boolean;
};

/**
 * NextEdgee Component
 * @param {NextEdgeeProps} props
 * @returns {JSX.Element}
 */
const NextEdgee = ({ src, dataInline }: NextEdgeeProps): JSX.Element => {

  dataInline = dataInline ?? true;

  /**
   * Edgee SDK script
   */
  const script = (
    <script id={'__EDGEE_SDK__'} async data-inline={dataInline} src={src}></script>
  );

  /**
   * Convert the url to Absolute URL based on the current window location.
   * @param url {string}
   * @returns {string}
   */
  const toAbsoluteURL = (url: string): string => {
    return new URL(url, window.location.href).href;
  };

  /**
   * Check if it is hash anchor or same page anchor
   * @param currentUrl {string} Current Url Location
   * @param newUrl {string} New Url detected with each anchor
   * @returns {boolean}
   */
  const isHashAnchor = (currentUrl: string, newUrl: string): boolean => {
    const current = new URL(toAbsoluteURL(currentUrl));
    const next = new URL(toAbsoluteURL(newUrl));
    return current.href.split('#')[0]===next.href.split('#')[0];
  };

  /**
   * Check if it is Same Host name
   * @param currentUrl {string} Current Url Location
   * @param newUrl {string} New Url detected with each anchor
   * @returns {boolean}
   */
  const isSameHostName = (currentUrl: string, newUrl: string): boolean => {
    const current = new URL(toAbsoluteURL(currentUrl));
    const next = new URL(toAbsoluteURL(newUrl));
    return current.hostname.replace(/^www\./, '')===next.hostname.replace(/^www\./, '');
  };

  React.useEffect((): ReturnType<React.EffectCallback> => {
    // NProgress.configure({
    //   template:
    //     template ??
    //     '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    // });

    /**
     * Check if the Current Url is same as New Url
     * @param currentUrl {string}
     * @param newUrl {string}
     * @returns {boolean}
     */
    function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string): boolean {
      const currentUrlObj = new URL(currentUrl);
      const newUrlObj = new URL(newUrl);
      // Compare hostname, pathname, and search parameters
      if (
        currentUrlObj.hostname===newUrlObj.hostname &&
        currentUrlObj.pathname===newUrlObj.pathname &&
        currentUrlObj.search===newUrlObj.search
      ) {
        // Check if the new URL is just an anchor of the current URL page
        const currentHash = currentUrlObj.hash;
        const newHash = newUrlObj.hash;
        return (
          currentHash!==newHash && currentUrlObj.href.replace(currentHash, '')===newUrlObj.href.replace(newHash, '')
        );
      }
      return false;
    }

    /**
     * Find the closest anchor to trigger
     * @param element {HTMLElement | null}
     * @returns element {Element}
     */
    function findClosestAnchor(element: HTMLElement | null): HTMLAnchorElement | null {
      while (element && element.tagName.toLowerCase()!=='a') {
        element = element.parentElement;
      }
      return element as HTMLAnchorElement;
    }

    /**
     *
     * @param event {MouseEvent}
     * @returns {void}
     */
    function handleClick(event: MouseEvent): void {
      try {
        const target = event.target as HTMLElement;
        const anchor = findClosestAnchor(target);
        const newUrl = anchor?.href;
        if (newUrl) {
          const currentUrl = window.location.href;
          // const newUrl = (anchor as HTMLAnchorElement).href;
          const isExternalLink = (anchor as HTMLAnchorElement).target==='_blank';

          // Check for Special Schemes
          const isSpecialScheme = ['tel:', 'mailto:', 'sms:', 'blob:', 'download:'].some((scheme) =>
            newUrl.startsWith(scheme)
          );

          const isAnchor: boolean = isAnchorOfCurrentUrl(currentUrl, newUrl);
          const notSameHost = !isSameHostName(window.location.href, anchor.href);
          if (notSameHost) {
            return;
          }
          if (
            newUrl===currentUrl ||
            isAnchor ||
            isExternalLink ||
            isSpecialScheme ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            isHashAnchor(window.location.href, anchor.href) ||
            !toAbsoluteURL(anchor.href).startsWith('http')
          ) {
            // todo - do not launch page event?
            console.log('Not launching page event')
          } else {
            // todo launch page event
            console.log('Launching page event')
          }
        }
      } catch (err) {
        // Log the error in development only!
        console.log('NextEdgee error: ', err);
      }
    }

    /**
     * Complete TopLoader Progress on adding new entry to history stack
     * @param {History}
     * @returns {void}
     */
    ((history: History): void => {
      const pushState = history.pushState;
      history.pushState = (...args) => {
        return pushState.apply(history, args);
      };
    })((window as Window).history);

    /**
     * Complete TopLoader Progress on replacing current entry of history stack
     * @param {History}
     * @returns {void}
     */
    ((history: History): void => {
      const replaceState = history.replaceState;
      history.replaceState = (...args) => {
        return replaceState.apply(history, args);
      };
    })((window as Window).history);


    // Add the global click event listener
    document.addEventListener('click', handleClick);

    // Clean up the global click event listener when the component is unmounted
    return (): void => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return script;
};
export default NextEdgee;

NextEdgee.propTypes = {
  color: PropTypes.string
};
