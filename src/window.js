const { BrowserWindow } = require('electron');

/**
 * @param {BrowserWindow} win
 */
exports.toggleWindowVisibility = function(win) {
	if (win.isVisible()) {
		win.hide();
	} else {
		win.show();
	}
}