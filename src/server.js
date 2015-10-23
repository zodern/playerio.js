/* @flow */

import readline from 'readline';
import PlayerIO from './playerio/playerio';

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

PlayerIO.QuickConnect.simpleConnect('everybody-edits-su9rn58o40itdbnw69plyw', 'guest1@tbp.com', 'guest', null, function (client) {
	client.multiplayer.createJoinRoom('PWAJwkxnxta0I', 'Everybodyedits201', true, null, null, false, function (connection: Connection) {
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

	}, function (error: ?PlayerIOError) {
		console.log(error);
	});
});
