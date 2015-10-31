/* @flow */

import * as ErrorCode from './enums/error-code';

export const CLIENT_API_TYPE = 'javascript';

export function getClientInfo(): Map<string, string> {
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

// Export the base modules and enums
export { default as QuickConnect } from './quick-connect';
export { default as Message } from './models/message';
export { ErrorCode };
