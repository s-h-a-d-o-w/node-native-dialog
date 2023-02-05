const winax = require('winax');
const wsh = new winax.Object('WScript.Shell');

/**
 * Show dialog in a blocking manner.
 *
 * @param {object} opts
 * @param {string} opts.msg "Body" of the dialog.
 * @param {number} opts.timeout Seconds - floating point values are rounded. (WSH imposes this)
 * @param {string} opts.title Title of the dialog.
 * @param {number} opts.icon Use constants for this. (See docs)
 * @param {number} opts.buttons Use constants for this. (See docs)
 * @param {number} opts.defaultButton Use constants for this. (See docs)
 * @returns {number} Use our constants to check for what the user chose.
 */
const show = (opts) => {
	if(!opts || !opts.hasOwnProperty('msg'))
		throw new Error('At least a message is required.');

	let icon = opts.icon || 0;
	let buttons = opts.buttons || 0;
	let defaultButton = opts.defaultButton || 0;

	// wsh.Popup handles undefined fine as long as the order is correct
	const args = [
		opts.msg,
		opts.timeout,
		opts.title,
		icon + buttons + defaultButton,
	];

	return wsh.Popup(...args);
};

// Names for constants deviate from the following docs to make them multiplatform-compatible
// https://technet.microsoft.com/en-us/library/ee156593.aspx
const icons = {
	ERROR: 16,
	QUESTION: 32,
	WARNING: 48,
	INFO: 64,
};

const buttons = {
	OK: 0,
	OK_CANCEL: 1,
	ABORT_RETRY_IGNORE: 2,
	YES_NO_CANCEL: 3,
	YES_NO: 4,
	RETRY_CANCEL: 5,
};

const defaultButton = {
	LEFT: 0,
	MIDDLE: 256,
	RIGHT: 512,
};

const results = {
	RESULT_TIMEOUT: -1,

	RESULT_OK: 1,
	RESULT_CANCEL: 2,
	RESULT_ABORT: 3,
	RESULT_RETRY: 4,
	RESULT_IGNORE: 5,
	RESULT_YES: 6,
	RESULT_NO: 7,
};

module.exports = {
	show,
	...icons,
	...buttons,
	...defaultButton,
	...results,
};
