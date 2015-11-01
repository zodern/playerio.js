/**
 * The address and port where a server can be reached.
 */
export default class ServerEndpoint {
	/**
	 * @private
	 */
	constructor(address, port) {
		/**
		 * The address/hostname of the server.
		 * @type {string}
		 */
		this.address = address;

		/**
		 * The port of the server.
		 * @type {number}
		 */
		this.port = port;
	}
}
