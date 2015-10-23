/* @flow */

export default class Message {
	constructor(type: string, ...items: Array<string | Buffer | number>) {
		this.type = type;
		this.items = items;
	}

	add(...items: Array<string | Buffer | number>) {
		// TODO: Check types
		this.items.push(...items);
	}

	getLength() {
		return this.items.length;
	}

	toString() {
		return this.items.toString();
	}
}
