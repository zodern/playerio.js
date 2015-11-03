/**
 * Represents a epresents a BigDB database object which has a key and a collection of named properties.
 */
export default class DatabaseObject {
  /**
   * The name of the BigDB table this object belongs to.
   * @type {string}
   */
  get table() {
    return this._table;
  }

  /**
   * The key of the object.
   * @type {string}
   */
  get key() {
    return this._key;
  }

  /**
   * List of properties contained by the object.
   * @type {*[]}
   */
  get items() {
    return this._items;
  }

  /**
   * Returns the number of properties in this object.
   * @type {number}
   */
  get length() {
    return null;
  }

  /**
   * Returns true if the object has been persisted.
   * @type {bool}
   */
  get isInDatabase() {
    return null;
  }

  /**
   * @private
   * @type {BigDB}
   */
  get owner() {
    return this._owner;
  }

  /**
   * @private
   * @type {string}
   */
  get version() {
    return this._version;
  }

  /**
   * @private
   */
  constructor() {
    
  }
}
