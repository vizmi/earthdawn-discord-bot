const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with roundtrip latency!'),
	async execute(interaction) {
		const { resource } = await interaction.reply({ content: 'Pinging...', withResponse: true });
		interaction.editReply(`Roundtrip latency: ${resource.message.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};