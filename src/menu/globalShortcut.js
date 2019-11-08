const {
  globalShortcut
} = require('electron');

/**
 * @param {Electron.BrowserWindow} win
 */
function shortcutTpl(win) {
  return [{
      accelerator: 'MediaPlayPause',
      func: () => win.webContents.send('play'),
    },
    {
      accelerator: 'MediaNextTrack',
      func: () => win.webContents.send('next'),
    },
    {
      accelerator: 'MediaPreviousTrack',
      func: () => win.webContents.send('prev'),
    },
    {
      accelerator: 'VolumeMute',
      func: () => win.webContents.send('mute'),
    },
  ]
}

/**
 * @param {Electron.BrowserWindow} win
 * @param {Electron.App} app
 */
exports.init = (win, app) => {
  const tplShortcut = shortcutTpl(win);

  tplShortcut.forEach((e)=>{
    globalShortcut.register(e.accelerator, e.func);
  })

  app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
  })
}