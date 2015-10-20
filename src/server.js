import PlayerIO from './playerio/playerio';

PlayerIO.QuickConnect.simpleConnect('everybody-edits-su9rn58o40itdbnw69plyw', 'guest1@tbp.com', 'guest', null, function (client) {
	client.multiplayer.joinRoom('PWJ3pjzc59bUI', null, function (connection) {
		connection.send(new PlayerIO.Message('init'));

		connection.on('message', function (m) {
			if (m.type == 'init') {
				connection.send(new PlayerIO.Message('say', 'HELLO FROM JAVASCRIPT!'));
			}
		});
	}, function (playerIOError) {
		console.log(playerIOError);
	});
});
