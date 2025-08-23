const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('arsene')
		.setDescription('no se we'),
	async execute(interaction) {
		await interaction.reply(`Es el tetas gordas 🥵.`);
	},
};