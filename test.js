var playerIO = require('./playerio/playerio')

playerIO.quickConnect.simpleConnect('everybody-edits-su9rn58o40itdbnw69plyw', 'guest', 'guest', [], function(userId) {
}, function (err){
	console.log(err);
});