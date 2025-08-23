const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hoshi')
		.setDescription('no se we'),
	async execute(interaction) {
		await interaction.reply(`Hoshit 🤑`);
	},
};