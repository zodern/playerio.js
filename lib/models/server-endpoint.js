/**
 * The address and port where a server can be reached.
 */
export default class ServerEndpoint {
	/**
	 * The address/hostname of the server.
	 * @type {string}
	 */
	get address() {
		return this._address;
	}

	/**
	 * The port of the server.
	 * @type {number}
	 */
	get port() {
		return this._port;
	}

	/**
	 * @private
	 * @param {string} address
	 * @param {number} port
	 */
	constructor(address, port) {
		this._address = address;
		this._port = port;
	}
}
