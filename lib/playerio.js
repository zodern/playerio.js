/* @flow */

import QuickConnect from './quick-connect';

/**
 * Entry class for the initial connection to Player.IO.
 */
export default class PlayerIO {
	/**
	 * Returns the client's type described as a string.
	 */
	static get clientType() {
		return 'javascript';
	}

	/**
	 * Returns the client's metadata.
	 */
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

	/**
	 * Property used to access the QuickConnect service.
	 */
	static get QuickConnect() {
		return QuickConnect;
	}
}
