const { Menu } = require('electron')
const { menuTemplate } = require('./template');

/**
 * @param {Electron.BrowserWindow} win
 * @param {Electron.App} app
 */
exports.create = (win, app) => {
	const dockMenu = Menu.buildFromTemplate(menuTemplate(win, app));

  if (app.dock.setMenu) {
    app.dock.setMenu(dockMenu);
  }
}