const dialog = require('./index.js');

test('No arguments supplied (sync)', () => {
	expect(() => {
		dialog.showSync();
	}).toThrow();
});

test('Minimum async Dialog', () => {
	return dialog.show({
		msg: 'Click OK (Minimum async Dialog)'
	})
	.then((result) => {
		expect(result).toEqual(1);
	});
});

// This should always be the one before timeout test, so
// that the user is warned ahead of time
test('Minimum sync Dialog', () => {
	expect(dialog.showSync({
		msg: 'Let the next one time out! This one, simply dismiss.'
	})).toEqual(1);
});

test.only('All arguments (timeout)', () => {
	expect(dialog.showSync({
		//msg: 'LET THIS TIME OUT! (3 seconds)',
		msg: 'Wow, native GUI feedback...',
		timeout: 3,
		//title: 'jest // node-dialog',
		title: 'node-dialog',
		icon: dialog.INFO,
		buttons: dialog.YES_NO_CANCEL,
		defaultButton: dialog.RIGHT,
	})).toEqual(-1);
});
