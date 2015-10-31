/* @flow */

import PlayerIOError from './playerio-error';

/**
 * Represents Player.IO errors which only occur during registration.
 */
export default class PlayerIORegistrationError extends PlayerIOError {
	/**
	 * @param {number} code An ErrorCode which represents the type of the error.
	 * @param {string} message A message which describes the error in detail.
	 * @param {string} usernameError The error for the username field, if any.
	 * @param {string} passwordError The error for the password field, if any.
	 * @param {string} emailError The error for the email field, if any.
	 * @param {string} captchaError The error for the captcha field, if any.
	 */
	constructor(code, message, usernameError, passwordError, emailError, captchaError) {
		super(code, message);

		/**
		 * The error for the username field, if any.
		 * @type {string}
		 */
		this.usernameError = usernameError;

		/**
		 * The error for the password field, if any.
		 * @type {string}
		 */
		this.passwordError = passwordError;

		/**
		 * The error for the email field, if any.
		 * @type {string}
		 */
		this.emailError = emailError;

		/**
		 * The error for the captcha field, if any.
		 * @type {string}
		 */
		this.captchaError = captchaError;
	}
}
