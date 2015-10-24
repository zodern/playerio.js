/* @flow */

import Connection from './connection';
import Converter from './helpers/converter';
import PlayerIOError from './models/playerio-error';
import ProtobufMessages from './models/protobuf-messages';

export default class Multiplayer {
	constructor(channel) {
		this.channel = channel;
	}

	createRoom(roomId: ?string, roomType: string, isVisible: bool, roomData: any, isDevRoom: bool, successCallback: (roomId: string) => void, errorCallback: (error: ?PlayerIOError) => void) {
		let args = ProtobufMessages.CreateRoomArgs.encode({
			roomId: roomId,
			roomType: roomType,
			visible: isVisible,
			roomData: Converter.toKeyValuePairs(roomData),
			isDevRoom: isDevRoom
		});

		this.channel.request(
			21, args, ProtobufMessages.CreateRoomOutput,
			function (obj) {
				successCallback(obj.roomId);
			},
			errorCallback
		);
	}

	joinRoom(roomId: ?string, joinData: any, isDevRoom: bool, successCallback: (connection: Connection) => void, errorCallback: (error: ?PlayerIOError) => void) {
		let args = ProtobufMessages.JoinRoomArgs.encode({
			roomId: roomId,
			joinData: Converter.toKeyValuePairs(joinData),
			isDevRoom: isDevRoom
		});

		this.channel.request(
			24, args, ProtobufMessages.JoinRoomOutput,
			function (obj) {
				let endpoints = obj.endpoints;
				let connection = new Connection(Multiplayer.getEndpoint(endpoints), obj.joinKey, joinData, roomId);
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

	createJoinRoom(roomId: ?string, roomType: string, isVisible: bool, roomData: any, joinData: any, isDevRoom: bool, successCallback: (connection: Connection) => void, errorCallback: (error: ?PlayerIOError) => void) {
		let args = ProtobufMessages.CreateJoinRoomArgs.encode({
			roomId: roomId,
			roomType: roomType,
			visible: isVisible,
			roomData: Converter.toKeyValuePairs(roomData),
			joinData: Converter.toKeyValuePairs(joinData),
			isDevRoom: isDevRoom
		});

		this.channel.request(
			27, args, ProtobufMessages.CreateJoinRoomOutput,
			function (obj) {
				let endpoints = obj.endpoints;
				let connection = new Connection(Multiplayer.getEndpoint(endpoints), obj.joinKey, joinData, obj.roomId);
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
