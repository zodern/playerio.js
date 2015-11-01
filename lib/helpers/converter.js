import PlayerIOError from './../models/playerio-error';
import ProtobufMessages from './../models/protobuf-messages';

/**
 * @private
 */
export default class Converter {
	/**
	 * @param {?Map} map The Map to be converted to an array of KeyValuePairs.
	 * @returns {{key: *, value: *}[]} Conversion result.
	 */
	static toKeyValuePairs(map) {
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

	/**
	 * @param {Object} obj The object to be converted to a PlayerIOError.
	 * @returns {PlayerIOError} Conversion result.
	 */
	static toPlayerIOError(obj) {
		return new PlayerIOError(obj.errorCode, obj.message);
	}
}
