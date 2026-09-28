const { SlashCommandBuilder } = require('discord.js');
const steps = require('./steps.js');

const roll = (step) => {
	const stepConfig = steps[step];

	if (!stepConfig) {
		throw new Error("Invalid step");
	}
	let roll = stepConfig.roll();
	let result = stepConfig.text + ' <> ' + roll;
	if (roll === stepConfig.min) {
		result += ' ❌';
	}

	return result;
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setNameLocalization('hu', 'dobj')
		.setDescription('Rolls Earhdawn 4 Edition dice')
		.setDescriptionLocalization('hu', 'Kockadobó az Earthdawn 4 kiadás szabályai szerint')
		.addIntegerOption(option => 
			option.setName('step')
				.setNameLocalization('hu', 'fokozat')
				.setRequired(true)
				.setDescription('Step')
				.setDescriptionLocalization('hu', 'Fokozat')
		),
	async execute(interaction) {

		const step = interaction.options.getInteger('step');
		// roll dice
		var response;
		try {
			response = roll(step);
		} catch (e) {
			interaction.reply({ content: e.message, ephemeral: true });
			return;
		}
		interaction.reply({ content: response });
	},
};
