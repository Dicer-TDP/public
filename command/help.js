const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setAuthor('HackuSate')
    .addFields(
        { name: 'Daftar perintah:', value: '```ping```\u200b\n```sapa nanda```\u200b\n```sapa qiqi```\u200b\n```sapa wisam```\u200b\n```pagi```\u200b\n```siang```\u200b\n```sore```\u200b\n```malam```\u200b\n```tengah malam```\u200b\n```help```'},
    )
    .setTimestamp()

module.exports = {
	name: 'help',
	description: 'ini adalah command help.',
	execute(message) {
		message.channel.send(Embed);
	}
}