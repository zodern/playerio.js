/* @flow */

import Connection from './connection';
import PlayerIOError from './models/playerio-error';
import ProtobufMessages from './models/protobuf-messages';
import Converter from './helpers/converter';

export default class Multiplayer {
	constructor(channel) {
		this.channel = channel;
	}

	createRoom(roomId: ?string, roomType: string, isVisible: bool, roomData: ?Map<string, string>, isDevRoom: bool, successCallback: (roomId: string) => void, errorCallback: (error: ?PlayerIOError) => void) {
		let args = ProtobufMessages.CreateRoomArgs.encode({
			roomId: roomId,
			roomType: roomType,
			visible: isVisible,
			roomData: Converter.toKeyValuePairs(roomData),
			isDevRoom: isDevRoom
		});

		this.channel.request(
			21, args, ProtobufMessages.CreateRoomOutput,
			(obj) => {
				successCallback(obj.roomId);
			},
			errorCallback
		);
	}

	joinRoom(roomId: ?string, joinData: ?Map<string, string>, isDevRoom: bool, successCallback: (connection: Connection) => void, errorCallback: (error: ?PlayerIOError) => void) {
		let args = ProtobufMessages.JoinRoomArgs.encode({
			roomId: roomId,
			joinData: Converter.toKeyValuePairs(joinData),
			isDevRoom: isDevRoom
		});

		this.channel.request(
			24, args, ProtobufMessages.JoinRoomOutput,
			(obj) => {
				let endpoints = obj.endpoints;
				let connection = new Connection(Multiplayer.getEndpoint(endpoints), obj.joinKey, joinData, roomId);
				connection.on('connect', () => {
					successCallback(connection);
				});
				connection.on('error', () => {
					errorCallback(connection.error);
				})
			},
			errorCallback
		);
	}

	createJoinRoom(roomId: ?string, roomType: string, isVisible: bool, roomData: ?Map<string, string>, joinData: ?Map<string, string>, isDevRoom: bool, successCallback: (connection: Connection) => void, errorCallback: (error: ?PlayerIOError) => void) {
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
			(obj) => {
				let endpoints = obj.endpoints;
				let connection = new Connection(Multiplayer.getEndpoint(endpoints), obj.joinKey, joinData, obj.roomId);
				connection.on('connect', () => {
					successCallback(connection);
				});
				connection.on('error', () => {
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
