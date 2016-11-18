import QuickConnect from './quick-connect';
import Message from './models/message';
import ErrorCode from './enums/error-code';

/**
 * Entry class for the initial connection to Player.IO.
 */
export default class PlayerIO {
  /**
   * Returns the client's type described as a string.
   * @type {string}
   */
  static get clientType() {
    return 'javascript';
  }

  /**
   * Returns the client's metadata.
   * @type {Map<string, string>}
   */
  static get clientInfo() {
    let map = new Map();

    if (typeof window !== 'undefined') {
      let navigator = window.navigator || null;
      if (navigator !== null) {
        let language = navigator.language || null;
        if (language !== null) {
          map.set('language', language);
        }

        let userAgent = navigator.userAgent || null;
        if (userAgent !== null) {
          map.set('userAgent', userAgent);
        }
      }
    }

    return map;
  }

  /**
   * Property used to access the QuickConnect service.
   * @type {QuickConnect}
   */
  static get QuickConnect() {
    return QuickConnect;
  }

  /**
   * @type {Message}
   */
  static get Message() {
    return Message;
  }

  /**
   * @type {ErrorCode}
   */
  static get ErrorCode() {
    return ErrorCode;
  }
}

// Initialize the default namespace for browsers
if (typeof window !== 'undefined') {
  window.PlayerIO = PlayerIO;
  window.Buffer = Buffer;
}
