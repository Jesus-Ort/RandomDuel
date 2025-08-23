const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('devuelve información sobre el usuario.'),
	async execute(interaction) {
		await interaction.reply(`Este comando fue usado por ${interaction.user.username}, se unió el ${interaction.member.joinedAt}.`);
	},
};