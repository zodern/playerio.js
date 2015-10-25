/* @flow */

import BigDB from './bigdb';
import HttpChannel from './http-channel';
import Multiplayer from './multiplayer';

export default class Client {
	constructor(token, connectUserId) {
		this.connectUserId = connectUserId;
		this.channel = new HttpChannel(token);

		this.bigDB = new BigDB(this.channel);
		this.multiplayer = new Multiplayer(this.channel);
	}
}
