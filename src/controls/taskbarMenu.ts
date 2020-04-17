import { BrowserWindow, nativeImage } from "electron";
import { getImageFile } from "./../app/media";

export const register = (win: BrowserWindow): boolean => {

    const result = win.setThumbarButtons([
        {
            tooltip: "Play | Pause",
            icon: nativeImage.createFromPath(getImageFile("play_arrow_white_18dp.png")),
            click: (): void => win.webContents.send("play")
        }, {
            tooltip: "Next",
            icon: nativeImage.createFromPath(getImageFile("skip_next_white_18dp.png")),
            click: (): void => win.webContents.send("next")
        }
    ]);

    return result;
};
