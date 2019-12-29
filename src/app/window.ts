import { BrowserWindow } from "electron";
import * as path from "path";
import { getIconFile, getRuntimePath } from "./media";
import { currentPlatform } from "./platform";

export function createWindow(lastWindowState: Electron.Rectangle) {
  const titleStyle = (currentPlatform.isMacOs) ? "customButtonsOnHover" : "hiddenInset";
  const mainWindow = new BrowserWindow({
    title: "Yandex.Music.App - Unofficial",
    show: false,
    x: lastWindowState.x === -1 ? undefined : lastWindowState.x,
    y: lastWindowState.y === -1 ? undefined : lastWindowState.y,
    height: lastWindowState.height || 700,
    width: lastWindowState.width || 848,
    icon: getIconFile("yaradio_32x32.png"),
    titleBarStyle: titleStyle,
    movable: true,
    minHeight: 700,
    minWidth: 848,
    autoHideMenuBar: true,
    backgroundColor: "#fff",
    webPreferences: {
      preload: path.join(getRuntimePath(), "js", "browser.js"),
      nodeIntegration: false,
      plugins: true,
      enableRemoteModule: false
    }
  });
  return mainWindow;
}
