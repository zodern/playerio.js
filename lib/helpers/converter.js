import PlayerIOError from './../models/playerio-error';
import ProtobufMessages from './../models/protobuf-messages';

/**
 * @private
 */
export default class Converter {
	/**
	 * @private
	 * @param {?Map} map The Map to be converted to an array of KeyValuePairs.
	 * @return {(key: *, value: *)[]}
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
	 * @private
	 * @param {Object} obj The object to be converted to a PlayerIOError.
	 * @return {PlayerIOError}
	 */
	static toPlayerIOError(obj) {
		return new PlayerIOError(obj.errorCode, obj.message);
	}
}
