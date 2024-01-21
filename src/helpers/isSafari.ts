export const isSafari =
  // @ts-ignore
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === '[object SafariRemoteNotification]';
  })(
    // @ts-ignore
    !window['safari'] ||
      // @ts-ignore
      (typeof safari !== 'undefined' && safari.pushNotification),
  );
