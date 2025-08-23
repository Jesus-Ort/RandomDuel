const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('num')
		.setDescription('genera un número aleatorio.'),
	async execute(interaction) {
		const randomNumber = Math.floor(Math.random() * 100) + 1;
		await interaction.reply(`Toma tu número aleatorio ${randomNumber} 🤬.`);
	},
};