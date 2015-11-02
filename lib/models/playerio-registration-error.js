import PlayerIOError from './playerio-error';

/**
 * Represents Player.IO errors which only occur during registration.
 */
export default class PlayerIORegistrationError extends PlayerIOError {
	/**
	 * The error for the username field, if any.
	 * @type {string}
	 */
	get usernameError() {
		return this._usernameError;
	}

	/**
	 * The error for the password field, if any.
	 * @type {string}
	 */
	get passwordError() {
		return this._passwordError;
	}

	/**
	 * The error for the e-mail field, if any.
	 * @type {string}
	 */
	get emailError() {
		return this._emailError;
	}

	/**
	 * The error for the captcha field, if any.
	 * @type {string}
	 */
	get captchaError() {
		return this._captchaError;
	}

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

		this._usernameError = usernameError;
		this._passwordError = passwordError;
		this._emailError = emailError;
		this._captchaError = captchaError;
	}
}
