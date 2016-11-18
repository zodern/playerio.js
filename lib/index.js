import Client from './client'
import Converter from './helpers/converter'
import ErrorCode from './enums/error-code';
import HTTPChannel from './http-channel';
import Message from './models/message';
import ProtobufMessages from './models/protobuf-messages'
import QuickConnect from './quick-connect';

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
   *
   *
   * @static
   * @param {any} gameId
   * @param {any} connectionId
   * @param {any} userId
   * @param {any} auth
   * @param {any} partnerId
   * @param {any} playerInsightSegments
   * @param {any} callback
   * @param {any} errorHandler
   *
   * @memberOf PlayerIO
   */
  static connect(gameId, connectionId, userId, auth, partnerId, playerInsightSegments, callback, errorHandler) {
    if (typeof partnerId == 'function') {
      callback = partnerId;
      errorHandler = playerInsightSegments;

      partnerId = null;
      playerInsightSegments = null;
    } else if (typeof playerInsightSegments === 'function') {
      errorHandler = callback;
      callback = playerInsightSegments;

      playerInsightSegments = null;
    }

    let args = new ProtobufMessages.ConnectArgs({
      gameId,
      connectionId,
      userId,
      auth,
      partnerId,
      playerInsightSegments,
      clientAPI: 'as3',
      clientInfo: Converter.toKeyValuePairs(PlayerIO.clientInfo)
    }).toBuffer();

    HTTPChannel.default.request(
      10,
      args,
      ProtobufMessages.ConnectOutput,
      (obj) => {
        callback(new Client(obj.token, obj.userId))
      },
      errorHandler
    );
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
