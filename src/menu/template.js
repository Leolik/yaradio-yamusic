const store = require('../store/store');
const notification = require('../notification/notification');
const { toggleWindowVisibility } = require('../window');

/**
 * @param {Electron.BrowserWindow} win
 * @param {Electron.App} app
 * @returns {Electron.MenuItemConstructorOptions[]}
*/
exports.menuTemplate = function(win, app) {
	return [
		{
			label: 'Play | Pause',
			click: () => win.webContents.send('play')
		},
		{
			label: 'Next Track',
			click: () => win.webContents.send('next')
		},
		{
			type: 'separator'
		},
		{
			label: 'Like',
			click: () => win.webContents.send('like')
		},
		{
			label: 'Dislike',
			click: () => win.webContents.send('dislike')
		},
		{
			type: 'separator'
		},
		{
			label: 'Show/Hide App',
			click: () => toggleWindowVisibility(win)
		},
		{
			type: 'submenu',
			label: 'Settings',
			submenu: [{
				type: 'checkbox',
				label: 'Notification',
				checked: store.get('settings.notifications'),
				click: () => {
					let value = !store.get('settings.notifications');
					notification.notifi('Settings', value ? 'Notification enabled' : 'Notification disabled', undefined, true);
					store.set('settings.notifications', value);
				}
			}]
		},
		{
			label: 'Quit',
			click: () => app.quit()
		}
	]
}