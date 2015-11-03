/**
 * Represents Player.IO errors which occur during application execution.
 */
export default class PlayerIOError {
  /**
   * The code of the error.
   * @type {number}
   */
  get code() {
    return this._code;
  }

  /**
   * The message provided with the error.
   * @type {string}
   */
  get message() {
    return this._message;
  }

  /**
   * @private
   * @param {number} code
   * @param {string} message
   */
  constructor(code, message) {
    this._code = code;
    this._message = message;
  }
}
