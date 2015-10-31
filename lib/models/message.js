/**
 * Represents a message sent between client and server.
 */
export default class Message {
	/**
	 * @private
	 */
	constructor(type, ...items) {
		/**
		 * The type of the current message.
		 * @type {string}
		 */
		this.type = type;

		/**
		 * The type of the current message.
		 * @type {...string|...Buffer|...number}
		 */
		this.items = items;
	}

	/**
	 * Adds new data entries to the message.
	 * @param {...(string|Buffer|number)} items A variable list of the data to add to the message.
	 */
	add(...items) {
		// TODO: Check types
		this.items.push(...items);
	}

	/**
	 * The number of data entries in the message, excluding the type.
	 * @type {number}
	 */
	get length() {
		return this.items.length;
	}

	/**
	 * Returns a string that represents the current object.
	 * @return {string}
	 */
	toString() {
		return this.items.toString();
	}
}
