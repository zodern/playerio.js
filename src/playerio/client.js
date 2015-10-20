/* @flow */

import HttpChannel from './http-channel';
import Multiplayer from './multiplayer';

export default class Client {
	constructor(token, connectUserId) {
		this.connectUserId = connectUserId;
		this.channel = new HttpChannel(token);
		this.multiplayer = new Multiplayer(this.channel);
	}
}
