/* @flow */

import PlayerIOError from './../models/playerio-error';
import ProtobufMessages from './../models/protobuf-messages';

export default class Converter {
	static toKeyValuePairs(map: ?Map) {
		let arr = [];
		if (map != null) {
			for (let [key, value] of map) {
				arr.push(new ProtobufMessages.KeyValuePair({
					key: key,
					value: value
				}))
			}
		}
		return arr;
	}

	static toPlayerIOError(obj: Object) {
		return new PlayerIOError(obj.errorCode, obj.message);
	}
}
