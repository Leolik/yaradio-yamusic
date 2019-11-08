const path = require('path');
const { Menu, Tray } = require('electron');
const { menuTemplate } = require('./template');
const { toggleWindowVisibility } = require('../window');

const iconPath = path.join(__dirname, '../../', 'media/icon', 'yaradio_16x16.png');

/**
 * @param {Electron.BrowserWindow} win
 * @param {Electron.app} app
 */
exports.create = (win, app) => {
	const ctxMenu = Menu.buildFromTemplate(menuTemplate(win, app));

	const appIcon = new Tray(iconPath);

	appIcon.setContextMenu(ctxMenu);
	appIcon.addListener('click', (e) => {
		e.preventDefault();
		toggleWindowVisibility(win);
	});
}
