const Discord = require('discord.js');
const mulai = Date.now();

module.exports = {
	name: 'ping',
	description: 'ini adalah command versi.',
	execute(message) {
		message.channel.send(":ping_pong: Ping.. mencari ping..").then(message => {
  
const end = Date.now()
message.edit(`:ping_pong: Pong! **${(end - mulai)}** ms!` )
});
	}
}