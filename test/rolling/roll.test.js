const test = require('node:test');
const assert = require('node:assert/strict');
const rollCommand = require('../../commands/rolling/roll.js');

const makeInteraction = (step) => {
	const replies = [];
	return {
		options: { getInteger: () => step },
		reply: async (payload) => { replies.push(payload); },
		replies,
	};
};

test('roll command exposes name and a required step option', () => {
	const json = rollCommand.data.toJSON();
	assert.equal(json.name, 'roll');
	const stepOption = json.options.find(o => o.name === 'step');
	assert.ok(stepOption);
	assert.equal(stepOption.required, true);
});

test('execute replies with the dice text and total for a valid step', async () => {
	const interaction = makeInteraction(8);
	await rollCommand.execute(interaction);
	assert.equal(interaction.replies.length, 1);
	const { content, ephemeral } = interaction.replies[0];
	assert.match(content, /^2d6 <> -?\d+( ❌)?$/);
	assert.ok(!ephemeral);
});

test('execute marks the rule of ones when every die shows a 1', async (t) => {
	t.mock.method(Math, 'random', () => 0); // floor(0 * size) + 1 === 1 for every die
	const interaction = makeInteraction(8);
	await rollCommand.execute(interaction);
	assert.equal(interaction.replies[0].content, '2d6 <> 2 ❌');
});

test('execute handles negative-modifier steps (step 1) and rule of ones', async (t) => {
	t.mock.method(Math, 'random', () => 0);
	const interaction = makeInteraction(1);
	await rollCommand.execute(interaction);
	assert.equal(interaction.replies[0].content, '1d4-2 <> -1 ❌');
});

test('execute replies ephemeral with an error for an out-of-range step', async () => {
	for (const step of [0, -1, 41, 1000]) {
		const interaction = makeInteraction(step);
		await rollCommand.execute(interaction);
		assert.deepEqual(interaction.replies[0], { content: 'Invalid step', ephemeral: true });
	}
});
