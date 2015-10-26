/* @flow */

import PlayerIOError from './playerio-error';

export default class PlayerIORegistrationError extends PlayerIOError {
	constructor(code: number, message: string, usernameError: string, passwordError: string, emailError: string, captchaError: string) {
		super(code, message);

		this.usernameError = usernameError;
		this.passwordError = passwordError;
		this.emailError = emailError;
		this.captchaError = captchaError;
	}
}
