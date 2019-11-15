import { App, BrowserWindow, nativeImage } from "electron";
import { getImageFile } from "./../app/media";

export const register = (win: BrowserWindow, app: App) => {

    const result = win.setThumbarButtons([
        {
            tooltip: "Play | Pause",
            icon: nativeImage.createFromPath(getImageFile("play_arrow_white_18dp.png")),
            click: () => win.webContents.send("play")
        }, {
            tooltip: "Next",
            icon: nativeImage.createFromPath(getImageFile("skip_next_white_18dp.png")),
            click: () => win.webContents.send("next")
        }
    ]);

    return result;
};
