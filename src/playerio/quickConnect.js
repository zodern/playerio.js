/* @flow */

import Client from './client';
import messages from './messages';
import HttpChannel from './HttpChannel';

export default class QuickConnect {
	static simpleConnect(gameId: string, usernameOrEmail: string, password: string, playerInsightSegments, successCallback, errorCallback) {
		let args = messages.SimpleConnectArgs.encode({
			gameId: gameId,
			usernameOrEmail: usernameOrEmail,
			password: password,
			playerInsightSegments: playerInsightSegments
		});

		HttpChannel.default.request(
			400, args, messages.SimpleConnectOutput,
			function(obj) {
				successCallback(new Client(obj.token, obj.userId));
			},
			errorCallback
		);
	}
}
