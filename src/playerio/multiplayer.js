/* @flow */

import Connection from './connection';
import Converter from './helpers/converter';
import ProtobufMessages from './models/protobuf-messages';

export default class Multiplayer {
	constructor(channel) {
		this.channel = channel;
	}

	joinRoom(roomId: string, joinData, successCallback, errorCallback) {
		let args = ProtobufMessages.JoinRoomArgs.encode({
			roomId: roomId,
			joinData: Converter.toKeyValuePairs(joinData),
			isDevRoom: false
		});

		this.channel.request(
			24, args, ProtobufMessages.JoinRoomOutput,
			function (obj) {
				let endpoints = obj.endpoints;
				let connection = new Connection(Multiplayer.getEndpoint(endpoints), obj.joinKey, joinData);
				connection.on('connect', function () {
					successCallback(connection);
				});
				connection.on('error', function () {
					errorCallback(connection.error);
				})
			},
			errorCallback
		);
	}

	static getEndpoint(endpoints) {
		return endpoints[0];
	}
}
