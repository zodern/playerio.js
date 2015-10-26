/* @flow */

import PlayerIOError from './models/playerio-error';
import ProtobufMessages from './models/protobuf-messages';

export default class BigDB {
	constructor(channel) {
		this.channel = channel;
	}

	loadMyPlayerObject(successCallback: (playerObject: any) => void, errorCallback: (error: ?PlayerIOError) => void) {
		let args = ProtobufMessages.LoadMyPlayerObjectArgs.encode({
			
		});

		this.channel.request(
			103, args, ProtobufMessages.LoadMyPlayerObjectOutput,
			function (obj) {
				successCallback(obj.playerObject);
			},
			errorCallback
		);
	}
}
