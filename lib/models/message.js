/**
 * Represents a message sent between client and server.
 */
export default class Message {
  /**
   * The type of the current message.
   * @type {string}
   */
  get type() {
    return this._type;
  }

  /**
   * List of data entries in the message, excluding the type.
   * @type {...string|...Buffer|...number}
   */
  get items() {
    return this._items;
  }

  /**
   * The number of data entries in the message, excluding the type.
   * @type {number}
   */
  get length() {
    return this.items.length;
  }

  /**
   * @private
   * @param {string} type
   * @param {...string|...Buffer|...number} items
   */
  constructor(type, ...items) {
    this._type = type;
    this._items = items;
  }

  /**
   * Adds new data entries to the message.
   * @param {...string|...Buffer|...number} items A variable list of the data to add to the message.
   */
  add(...items) {
    // TODO: Check types
    this._items.push(items);
  }

  /**
   * Returns a string that represents the current object.
   * @returns {string}
   */
  toString() {
    return this._items.toString();
  }
}
