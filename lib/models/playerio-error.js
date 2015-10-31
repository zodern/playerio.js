/**
 * Represents Player.IO errors which occur during application execution.
 */
export default class PlayerIOError {
	/**
	 * @param {number} code An ErrorCode which represents the type of the error.
	 * @param {string} message A message which describes the error in detail.
	 */
	constructor(code, message) {
		/**
		 * The code of the error.
		 * @type {number}
		 */
		this.code = code;

		/**
		 * The message provided with the error.
		 * @type {string}
		 */
		this.message = message;
	}
}
