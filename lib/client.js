import BigDB from './bigdb';
import HttpChannel from './http-channel';
import Multiplayer from './multiplayer';

/**
 * Access class to the various Player.IO services.
 */
export default class Client {
	/**
	 * @private
	 * @param {string} token
	 * @param {string} connectUserId
	 */
	constructor(token, connectUserId) {
		this._channel = new HttpChannel(token);

		/**
		 * The connectUserId of this client.
		 * @type {string}
		 */
		this.connectUserId = connectUserId;

		/**
		 * Property used to access the BigDB service.
		 * @type {BigDB}
		 */
		this.bigDB = new BigDB(this._channel);

		/**
		 * Property used to access the BigDB service.
		 * @type {BigDB}
		 */
		this.multiplayer = new Multiplayer(this._channel);
	}
}
