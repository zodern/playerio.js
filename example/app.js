/* @flow */
/* eslint no-console: 0 */

import readline from 'readline';
import PlayerIO from './../lib/playerio';

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

PlayerIO.QuickConnect.simpleConnect('everybody-edits-su9rn58o40itdbnw69plyw', 'guest1@tbp.com', 'guest', null, function (client) {
	client.bigDB.loadMyPlayerObject(function (playerObject) {
		console.log('BigDB - Current PlayerObject:')
		console.log(playerObject);
	}, function (error) {
		console.log(error);
	});

	client.multiplayer.createJoinRoom('PWAJwkxnxta0I', 'Everybodyedits201', true, null, null, false, function (connection) {
		connection.on('message', function (m) {
			if (m.type === 'init') {
				// Allow custom chat messages to be sent
				console.log('[INFO] Now you can start chatting.');
				rl.on('line', function (line) {
					connection.send(new PlayerIO.Message('say', line));
				});
			}
		});

		connection.send(new PlayerIO.Message('init'));

	}, function (error) {
		console.log(error);
	});
});
