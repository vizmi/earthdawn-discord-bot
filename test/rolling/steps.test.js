const test = require('node:test');
const assert = require('node:assert/strict');
const steps = require('../../commands/rolling/steps.js');

const TRIALS = 3000;

// Open-ended (exploding) die that rerolls and adds on the max face:
// E[X] = s(s+1) / (2(s-1))
const expectedDieMean = (size) => (size * (size + 1)) / (2 * (size - 1));

// Derive dice composition from the display text (e.g. "1d12+1d10+1d8"),
// independent of how `roll()` is implemented, so the test can't be fooled
// by a bug that's baked into both the config and its own logic.
const parseDiceGroups = (text) => {
	const groups = {};
	for (const [, count, size] of text.matchAll(/(\d+)d(\d+)/g)) {
		groups[size] = (groups[size] || 0) + Number(count);
	}
	return groups;
};

for (const [step, config] of Object.entries(steps)) {
	test(`step ${step} (${config.text}) has the expected shape`, () => {
		assert.equal(typeof config.text, 'string');
		assert.equal(typeof config.roll, 'function');
		assert.equal(typeof config.min, 'number');
	});

	test(`step ${step} (${config.text}) rolls match the analytic distribution`, () => {
		const groups = parseDiceGroups(config.text);
		const diceCount = Object.values(groups).reduce((a, b) => a + b, 0);
		const modifier = config.min - diceCount;
		const expectedMean = modifier + Object.entries(groups)
			.reduce((sum, [size, count]) => sum + count * expectedDieMean(Number(size)), 0);
		const pAllOnes = Object.entries(groups)
			.reduce((p, [size, count]) => p * (1 / Number(size)) ** count, 1);

		const rolls = Array.from({ length: TRIALS }, () => config.roll());

		// Every roll must be a real number. A regression to array/string
		// concatenation (like the earlier `d(6)+d(6)` bug) shows up here.
		assert.ok(rolls.every(r => typeof r === 'number' && Number.isFinite(r)));

		const sampleMean = rolls.reduce((a, b) => a + b, 0) / TRIALS;
		const variance = rolls.reduce((a, b) => a + (b - sampleMean) ** 2, 0) / (TRIALS - 1);
		const meanTolerance = Math.max(5 * Math.sqrt(variance / TRIALS), 0.15);
		assert.ok(
			Math.abs(sampleMean - expectedMean) <= meanTolerance,
			`mean ${sampleMean.toFixed(3)} vs expected ${expectedMean.toFixed(3)} (tolerance ${meanTolerance.toFixed(3)})`,
		);

		const onesCount = rolls.filter(r => r === config.min).length;
		const expectedOnesCount = TRIALS * pAllOnes;
		const onesTolerance = Math.max(5, 4 * Math.sqrt(TRIALS * pAllOnes * (1 - pAllOnes)));
		assert.ok(
			Math.abs(onesCount - expectedOnesCount) <= onesTolerance,
			`rule-of-ones count ${onesCount} vs expected ${expectedOnesCount.toFixed(2)} (tolerance ${onesTolerance.toFixed(2)})`,
		);
	});
}
