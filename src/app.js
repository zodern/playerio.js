var playerIO = require('./playerio/playerIO'),
	Message = playerIO.Message

playerIO.quickConnect.simpleConnect('everybody-edits-su9rn58o40itdbnw69plyw', 'guest1@tbp.com', 'guest', null, function(client) {
	client.multiplayer.joinRoom('PWAJwkxnxta0I', null, function(connection) {
		connection.send(new Message('init', []));
		
		connection.on('message', function (m) {
			if (m.type == "init") {				
				connection.send(new Message('say', ["HELLO FROM JAVASCRIPT!"]));
			}
		});
	}, function (playerIOError) {
		console.log(playerIOError);
	});
});