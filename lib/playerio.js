/* @flow */

import QuickConnect from './quick-connect';
import Message from './models/message';
import * as ErrorCode from './enums/error-code';

/**
 * The main Player.IO object which acts as the base of method execution.
 */
export default class PlayerIO {
	// TODO: Add support for proxies
	constructor() {

	}

	static get clientApi(): string {
		return 'javascript';
	}

	static get clientInfo(): Map<string, string> {
		let map = new Map();

		if (typeof window !== 'undefined') {
			let navigator = window.navigator || null;
			if (navigator !== null) {
				let language = navigator.language || null;
				if (language !== null) {
					map.set('language', language);
				}

				let userAgent = navigator.userAgent || null;
				if (userAgent !== null) {
					map.set('userAgent', userAgent);
				}
			}
		}

		return map;
	}
}

// Define every public module
PlayerIO.QuickConnect = QuickConnect;
PlayerIO.Message = Message;
PlayerIO.ErrorCode = ErrorCode;

// Initialize the default namespace for browsers
if (typeof window !== 'undefined') {
	window.PlayerIO = PlayerIO;
}
