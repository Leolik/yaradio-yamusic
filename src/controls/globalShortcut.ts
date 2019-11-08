import { BrowserWindow, globalShortcut, App } from "electron";

function shortcutTpl(win: BrowserWindow) {
  return [{
      accelerator: "MediaPlayPause",
      func: () => win.webContents.send("play"),
    },
    {
      accelerator: "MediaNextTrack",
      func: () => win.webContents.send("next"),
    },
    {
      accelerator: "MediaPreviousTrack",
      func: () => win.webContents.send("prev"),
    },
    {
      accelerator: "VolumeMute",
      func: () => win.webContents.send("mute"),
    },
  ];
}

export const register = (win: BrowserWindow, app: App) => {
  const tplShortcut = shortcutTpl(win);

  tplShortcut.forEach((e) => {
    globalShortcut.register(e.accelerator, e.func);
  });

  app.on("will-quit", () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
  });
};
