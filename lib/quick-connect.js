/* @flow */

import Client from './client';
import HttpChannel from './http-channel';
import PlayerIO from './';
import PlayerIOError from './models/playerio-error';
import PlayerIORegistrationError from './models/playerio-registration-error';
import ProtobufMessages from './models/protobuf-messages';
import Converter from './helpers/converter';

/**
 * Entry class for making a QuickConnect connection to Player.IO.
 */
export default class QuickConnect {
	static simpleConnect(gameId: string, usernameOrEmail: string, password: string, playerInsightSegments, successCallback: (client: Client) => void, errorCallback: (error: ?PlayerIOError) => void) {
		let args = ProtobufMessages.SimpleConnectArgs.encode({
			gameId: gameId,
			usernameOrEmail: usernameOrEmail,
			password: password,
			playerInsightSegments: playerInsightSegments
		});

		HttpChannel.default.request(
			400, args, ProtobufMessages.SimpleConnectOutput,
			(obj) => {
				successCallback(new Client(obj.token, obj.userId));
			},
			errorCallback
		);
	}

	static simpleRegister(gameId: string, username: string, password: string, email: string, captchaKey: string, captchaValue: string, extraData: ?Map<string, string>, partnerId: string, playerInsightSegments: Array<string>, successCallback: (client: Client) => void, errorCallback: (error: ?PlayerIORegistrationError) => void) {
		let args = ProtobufMessages.SimpleRegisterArgs.encode({
			gameId: gameId,
			username: username,
			password: password,
			email: email,
			captchaKey: captchaKey,
			captchaValue: captchaValue,
			extraData: Converter.toKeyValuePairs(extraData),
			partnerId: partnerId,
			playerInsightSegments: playerInsightSegments,
			clientAPI: PlayerIO.clientType,
			clientInfo: Converter.toKeyValuePairs(PlayerIO.clientInfo)
		});

		HttpChannel.default.customRequest(
			403, args, ProtobufMessages.SimpleRegisterOutput, ProtobufMessages.SimpleRegisterError,
			(obj) => {
				successCallback(new Client(obj.token, obj.userId));
			},
			errorCallback
		);
	}
}
