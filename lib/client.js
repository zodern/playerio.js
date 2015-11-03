import BigDB from './bigdb';
import HttpChannel from './http-channel';
import Multiplayer from './multiplayer';

/**
 * Access class to the various Player.IO services.
 */
export default class Client {
  /**
   * The connectUserId of this client.
   * @type {string}
   */
  get connectUserId() {
    return this._connectUserId;
  }

  /**
   * Property used to access the BigDB service.
   * @type {BigDB}
   */
  get bigDB() {
    return this._bigDB;
  }

  /**
   * Property used to access the BigDB service.
   * @type {BigDB}
   */
  get multiplayer() {
    return this._multiplayer;
  }

  /**
   * @private
   * @param {string} token
   * @param {string} connectUserId
   */
  constructor(token, connectUserId) {
    let channel = new HttpChannel(token);
    this._channel = channel;
    this._connectUserId = connectUserId;

    this._bigDB = new BigDB(channel);
    this._multiplayer = new Multiplayer(channel);
  }
}
