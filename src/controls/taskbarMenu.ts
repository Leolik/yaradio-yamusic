import { App, BrowserWindow, nativeImage } from "electron";
import { getIconFile } from "./../app/media";

export const register = (win: BrowserWindow, app: App) => {
    const iconPath = getIconFile("yaradio_16x16.png");

    win.setThumbarButtons([
        {
            tooltip: "Play | Pause",
            icon: nativeImage.createFromPath(iconPath),
            click: () => win.webContents.send("play")
        }, {
            tooltip: "Next",
            icon: nativeImage.createFromPath(iconPath),
            click: () => win.webContents.send("next")
        }
    ])
};
