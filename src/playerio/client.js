/* @flow */

import HttpChannel from './HttpChannel';
import Multiplayer from './Multiplayer';

export default class Client {
	constructor(token, connectUserId) {
		this.connectUserId = connectUserId;
		this.channel = new HttpChannel(token);
		this.multiplayer = new Multiplayer(this.channel);
	}
}
