# I have decided to archive this because it occurred to me that it isn't necessary. Just use `winax` directly instead:

```
const winax = require('winax');
const wsh = new winax.Object('WScript.Shell');
wsh.Popup(/* ... */)
```

The API is documented here:
- https://ss64.com/vb/popup.html
- https://learn.microsoft.com/en-us/previous-versions/tn-archive/ee156593(v=technet.10)?redirectedfrom=MSDN


[![npm version](https://img.shields.io/npm/v/node-native-dialog.svg)](https://www.npmjs.com/package/node-native-dialog)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# ~~node-native-dialog~~

Display a native dialog from your Node.js app.
The difference to e.g. [`dialog`](https://github.com/tomas/dialog) is that this does not spawn
a separate process for showing the dialog.

Because of this, it also lends itself better to be used in apps that make use of
packaging with tools like [pkg](https://github.com/zeit/pkg).

Windows 11 example

![node-dialog Windows 11 Screenshot](https://raw.githubusercontent.com/s-h-a-d-o-w/node-native-dialog/master/assets/screenshots/node-dialog-win11.png)

Windows 7 example

![node-dialog Windows 7 Screenshot](https://raw.githubusercontent.com/s-h-a-d-o-w/node-native-dialog/master/assets/screenshots/node-dialog-win32.png)

## Usage

```js
const dialog = require('node-native-dialog');

dialog.showSync({
	msg: 'Execution pauses here until user dismisses dialog.',

	// Same options as below
});

dialog.show({
	msg: 'Wow, native GUI feedback...',

	// Everything below is optional
	timeout: 3, // Seconds - floating point numbers are rounded
	title: 'node-dialog',
	icon: dialog.INFO,
	buttons: dialog.YES_NO_CANCEL,
	defaultButton: dialog.RIGHT,
})
.then((result) => {
	if(result === dialog.RESULT_TIMEOUT) {
		console.log('User did not respond in time.');
	}
	else if(result === dialog.RESULT_CANCEL) {
		console.log('User chose default button.');
	}
	else {
		console.log('Some other choice.');
	}
});
```

## Notes

### Windows

In order for the dialog to not appear blurry on displays that don't use 100% scale, you can enable the following compatibility setting for `node.exe`:

![node compatibility setting](https://raw.githubusercontent.com/s-h-a-d-o-w/node-native-dialog/master/assets/screenshots/node-compatibility-setting.png)

The constants listed below are in accordance with the following but the they have been renamed to
conform better with what one is used to from the web and to be more neutral (future multi-platform
compatibility):
https://technet.microsoft.com/en-us/library/ee156593.aspx

### macOS

No implementation yet.

### Linux

No implementation yet.

## Constants

### Icons

	ERROR
	QUESTION
	WARNING
	INFO

### Buttons

	OK
	OK_CANCEL
	ABORT_RETRY_IGNORE
	YES_NO_CANCEL
	YES_NO
	RETRY_CANCEL

### Default Buttons

	LEFT
	MIDDLE
	RIGHT

### Results

	RESULT_TIMEOUT

	RESULT_OK
	RESULT_CANCEL
	RESULT_ABORT
	RESULT_RETRY
	RESULT_IGNORE
	RESULT_YES
	RESULT_NO

## Contributing <a name="contributing">

It's fine if you can't implement all the same icon or button types but it should use a
native implementation like [`winax`](https://github.com/durs/node-activex) does with
wrapping ActiveX objects.
