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
    let keys = [];
    if (map && Object.keys(map).length > 0) {
      for (let key in map) {
        keys.push({
          key: key,
          value: map[key].toString()
        });
      }
    }
    return keys;
  }

  /**
   * @param {Object} obj The object to be converted to a PlayerIOError.
   * @returns {PlayerIOError} Conversion result.
   */
  static toPlayerIOError(obj) {
    return new PlayerIOError(obj.errorCode, obj.message);
  }
}
