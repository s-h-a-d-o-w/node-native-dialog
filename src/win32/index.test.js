const dialog = require('./index.js');

test('should fail if no arguments are supplied', () => {
	expect(() => {
		dialog.show();
	}).toThrow();
});

// This should always be the one before timeout test, so
// that the user is warned ahead of time
test('minimum sync Dialog', () => {
	expect(dialog.show({
		msg: 'Let the next one time out! This one, simply dismiss.'
	})).toEqual(1);
});

test('All arguments (timeout)', () => {
	expect(dialog.show({
		msg: 'LET THIS TIME OUT! (3 seconds)',
		timeout: 3,
		title: 'jest // node-dialog',
		icon: dialog.INFO,
		buttons: dialog.YES_NO_CANCEL,
		defaultButton: dialog.RIGHT,
	})).toEqual(-1)
});
