/**
 * Represents Player.IO errors which occur during application execution.
 */
export default class PlayerIOError {
	/**
	 * @private
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
