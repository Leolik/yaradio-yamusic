import { BrowserWindow, globalShortcut, App } from "electron";

interface Shortcut {
  accelerator: string;
  func: () => void;
}

function shortcutTpl(win: BrowserWindow): Shortcut[] {
  return [{
      accelerator: "MediaPlayPause",
      func: (): void => win.webContents.send("play"),
    },
    {
      accelerator: "MediaNextTrack",
      func: (): void => win.webContents.send("next"),
    },
    {
      accelerator: "MediaPreviousTrack",
      func: (): void => win.webContents.send("prev"),
    },
    {
      accelerator: "VolumeMute",
      func: (): void => win.webContents.send("mute"),
    },
  ];
}

export const register = (win: BrowserWindow, app: App): void => {
  const tplShortcut = shortcutTpl(win);

  tplShortcut.forEach((e) => {
    globalShortcut.register(e.accelerator, e.func);
  });

  app.on("will-quit", () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
  });
};
