import ProtobufMessages from './models/protobuf-messages';

/**
 * The Player.IO BigDB service which is used to create, load and delete database objects.
 */
export default class BigDB {
	/**
	 * @private
	 * @param {HttpChannel} channel
	 */
	constructor(channel) {
		this._channel = channel;
	}

	/**
	 * Loads the database object corresponding to the current player from the PlayerObjects table.
	 * @param {function(playerObject: Object): undefined} successCallback Callback with the loaded player object.
	 * @param {function(error: ?PlayerIOError): undefined} errorCallback Callback that will be called instead of successCallback if an error occurs during the load.
	 */
	loadMyPlayerObject(successCallback, errorCallback) {
		let args = ProtobufMessages.LoadMyPlayerObjectArgs.encode({
			
		});

		this._channel.request(
			103, args, ProtobufMessages.LoadMyPlayerObjectOutput,
			(obj) => {
				successCallback(obj.playerObject);
			},
			errorCallback
		);
	}
}
