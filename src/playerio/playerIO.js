/* @flow */

// TODO: Change to imports
//import Message from './models/Message';
import Message from './Message';
let QuickConnect = require('./quickConnect');

/**
 * The main Player.IO object which acts as the base of method execution.
 */
export default class PlayerIO {
	// TODO: Add support for proxies
	constructor() {

	}
};

// Define every public module
PlayerIO.QuickConnect = QuickConnect;
PlayerIO.Message = Message;

// Initialize the default namespace for browsers
window.PlayerIO = PlayerIO;
