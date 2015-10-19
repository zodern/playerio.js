/* @flow */

import Client from './Client';
import HttpChannel from './HttpChannel';
import ProtobufMessages from './models/ProtobufMessages';

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
