const test = require('node:test');
const assert = require('node:assert/strict');
const pingCommand = require('../../commands/utility/ping.js');

test('ping command exposes name and description', () => {
	const json = pingCommand.data.toJSON();
	assert.equal(json.name, 'ping');
	assert.ok(json.description.length > 0);
});

test('execute reports the roundtrip latency', async () => {
	const edits = [];
	const interaction = {
		createdTimestamp: 1000,
		reply: async () => ({ createdTimestamp: 1042 }),
		editReply: (content) => { edits.push(content); },
	};
	await pingCommand.execute(interaction);
	assert.equal(edits[0], 'Roundtrip latency: 42ms');
});
