import PlayerIOError from './playerio-error';

/**
 * Represents Player.IO errors which only occur during registration.
 */
export default class PlayerIORegistrationError extends PlayerIOError {
	/**
	 * @private
	 * @param {number} code
	 * @param {string} message
	 * @param {string} usernameError
	 * @param {string} passwordError
	 * @param {string} emailError
	 * @param {string} captchaError
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
		 * The error for the e-mail field, if any.
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
