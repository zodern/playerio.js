import BinarySerializer from './helpers/binary-serializer';
import ByteBuffer from 'bytebuffer';
import ErrorCode from './enums/error-code';
import { EventEmitter } from 'events';
import Message from './models/message';
import PlayerIOError from './models/playerio-error';
import { addRoom } from './connectionManager';

/**
 * A connection to a running Player.IO multiplayer room.
 */
export default class Connection extends EventEmitter {
  static _getEndpoint(endpoints) {
    return endpoints[0];
  }

  /**
   * Determines whether the connection is currently connected to a remote host.
   * @type {boolean}
   */
  get isConnected() {
    return this._isConnected;
  }

  /**
   * Represents the ID of the current room.
   * @type {string}
   */
  get roomId() {
    return this._roomId;
  }

  /**
   * The current error, if there is any.
   * @private
   * @type {?PlayerIOError}
   */
  get error() {
    return this._error;
  }

  /**
   * @private
   * @param {ServerEndpoint[]} endpoints
   * @param {string} joinKey
   * @param {?Map<string, string>} joinData
   * @param {string} roomId
   */
  constructor(endpoints, joinKey, joinData, roomId) {
    super();

    console.log('new connection');

    this._isConnected = false;
    this._roomId = roomId;

    let endpoint = Connection._getEndpoint(endpoints);
    let serializer = new BinarySerializer();

    serializer.on('message', (message) => {
      // console.log('full  message', roomId, message);
      if (!this._isConnected && message.type === 'playerio.joinresult') {
        if (!message.items[0]) {
          this._error = new PlayerIOError(message.items[1], message.items[2]);
          this.disconnect();
        } else {
          this._isConnected = true;
          this.emit('connect');
        }

      } else {
        this.emit('message', message);
      }
    });

    let sock = addRoom(serializer, endpoint);
    this._sock = sock;

    sock.on('connect', () => {
      // this._sock.write(new ByteBuffer([0]));
      let msg = new Message('join', joinKey);
      if (joinData != null) {
        for (let key in joinData) {
          msg.add(key.toString());
          msg.add(joinData[key].toString());
        }
      }
      this.send(msg);
    });

    sock.on('data', (data) => {
      serializer.addBytes(data.view);
    });

    sock.on('close', () => {
      console.log('disconnected from server');
      if (this._isConnected) {
        this._isConnected = false;
        this.emit('disconnect');
      } else {
        this._error = this._error || new PlayerIOError(ErrorCode.unsupportedMethod, 'Error connecting to server.');
        this.emit('error');
      }
    });
  }

  /**
   * Sends a message to the server. If message is a string, will create a message
   * @param {Message | string} message The message to send.
   * @param {...string| ...Buffer| ...number} values
   */
  send(message, ...values) {
    if (this._isConnected === false) {
      console.trace('sending when disconnected');
      console.log(message, values);
    }
    if (!(message instanceof Message)) {
      message = new Message(message);
      values.forEach((value) => {
        message.add(value);
      })
    }
    this._sock.write(BinarySerializer.serializeMessage(message));
  }

  /**
   * Disconnects from the game room.
   */
  disconnect() {
    this._sock.close();
  }
}
