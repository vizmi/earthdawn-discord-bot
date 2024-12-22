const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const data = require('./data.js');

const roll_die = (size) => {
	const rolls = []
	let r = Math.floor(Math.random() * size) + 1;
	while (r == size) {
		rolls.push(r);
		r = Math.floor(Math.random() * size) + 1;
	}
	rolls.push(r);
	return rolls;
}

const roll_dice = (dice) => {
	const rolls = [];
	// iterate over dice
	dice.forEach(sizeCount => {
		const [size, count] = sizeCount;
		for (let i = 0; i < count; i++) {
	        let r = roll_die(size);
			rolls.push(...r);
		}
    });
	return rolls;
}

const respond = (dice, rolls) => {
	// build dice pool string
	let resp = dice.map((sizeCount) => {
		const [size, count] = sizeCount;
		return count + 'D' + size;
	}).join('+');
	resp += ' <> ';
	
	// build rolls string
	resp += rolls.join(' + ');
	
	// build total string
	const total = rolls.reduce((acc, r) => { return acc + r }, 0);
	resp += ' = ' + total;

	// rule of ones
	if (rolls.every(r => r == 1)) {
		resp += ' ❌';
	}

	return resp;
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

		// roll dice
		const step = interaction.options.getInteger('step');
		if (!data.steps[step]) {
			interaction.reply({ content: 'Invalid step', ephemeral: true });
			return;
		}
		dice = data.steps[step];
		const rolls = roll_dice(dice);
		let resp = respond(dice, rolls);
		interaction.reply({ content: resp });
	},
};
