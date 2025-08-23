const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('num')
		.setDescription('get a random number.'),
	async execute(interaction) {
		const randomNumber = Math.floor(Math.random() * 100) + 1;
		await interaction.reply(`This command was run by ${interaction.user.username} and the random number is ${randomNumber}.`);
	},
};