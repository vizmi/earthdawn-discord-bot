const test = require('node:test');
const assert = require('node:assert/strict');
const { loadCommands } = require('../load-commands.js');

// Exercises the real loader used by index.js and deploy-commands.js.
const commands = loadCommands();

test('loadCommands finds at least one command', () => {
	assert.ok(commands.length > 0);
});

for (const command of commands) {
	test(`${command.data.name} is a valid slash command`, () => {
		const json = command.data.toJSON();
		assert.equal(typeof json.name, 'string');
		assert.ok(json.name.length > 0);
		assert.equal(typeof json.description, 'string');
		assert.ok(json.description.length > 0);
		assert.equal(typeof command.execute, 'function');
	});
}
