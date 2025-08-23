const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('devuelve información sobre el servidor.'),
	async execute(interaction) {
		
		await interaction.reply(`El server es: ${interaction.guild.name} y tiene ${interaction.guild.memberCount} miembros.`);
	},
};