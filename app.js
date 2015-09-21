var playerIO = require('./playerio/playerio')

playerIO.quickConnect.simpleConnect('everybody-edits-su9rn58o40itdbnw69plyw', 'guest', 'guest', [], function(client) {
	client.multiplayer.joinRoom('PW01', null, function(connection) {
		console.log(connection);
	}, function (playerIOError) {
		console.log(playerIOError);
	});
});

