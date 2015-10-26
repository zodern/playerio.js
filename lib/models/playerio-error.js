/* @flow */

export default class PlayerIOError {
	constructor(code: number, message: string) {
		this.code = code;
		this.message = message;
	}
}
