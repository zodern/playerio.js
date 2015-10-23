/* @flow */

import Client from './client';
import HttpChannel from './http-channel';
import ProtobufMessages from './models/protobuf-messages';

export default class QuickConnect {
	static simpleConnect(gameId: string, usernameOrEmail: string, password: string, playerInsightSegments, successCallback, errorCallback) {
		let args = ProtobufMessages.SimpleConnectArgs.encode({
			gameId: gameId,
			usernameOrEmail: usernameOrEmail,
			password: password,
			playerInsightSegments: playerInsightSegments
		});

		HttpChannel.default.request(
			400, args, ProtobufMessages.SimpleConnectOutput,
			function (obj) {
				successCallback(new Client(obj.token, obj.userId));
			},
			errorCallback
		);
	}
}
