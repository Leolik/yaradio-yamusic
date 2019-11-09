import { App, BrowserWindow, nativeImage } from "electron";
import * as path from "path";

const iconPath = path.join(__dirname, "../", "media/icon", "yaradio_16x16.png");

export const register = (win: BrowserWindow, app: App) => {
    win.setThumbarButtons([
        {
            tooltip: 'Play | Pause',
            icon: nativeImage.createFromPath(iconPath),
            click: () => win.webContents.send("play")
        }, {
            tooltip: 'Next',
            icon: nativeImage.createFromPath(iconPath),
            click: () => win.webContents.send("next")
        }
    ])
};
