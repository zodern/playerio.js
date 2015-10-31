/**
 * The address and port where a server can be reached.
 */
export default class ServerEndpoint {
	/**
	 * @param {string} address The address/hostname of the server.
	 * @param {number} port The port of the server.
	 */
	constructor(address: string, port: number) {
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
