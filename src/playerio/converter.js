/* @flow */

import messages from './messages';
import PlayerIOError from './PlayerIOError';

export default class Converter {
	static toKeyValuePairs(obj) {
		let arr = [];
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				let value = obj[key];
				arr.push(new messages.KeyValuePair({
					key: key,
					value: value
				}))
			}
		}
		return arr;
	}

	static toPlayerIOError(obj) {
		return new PlayerIOError(obj.errorCode, obj.message);
	}
}
