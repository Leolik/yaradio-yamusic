import { App, BrowserWindow, Menu, Tray } from "electron";
import * as path from "path";
import { toggleWindowVisibility } from "../window";
import { menuTemplate } from "./template";

const iconPath = path.join(__dirname, "../", "media/icon", "yaradio_16x16.png");

export const register = (win: BrowserWindow, app: App) => {
    const ctxMenu = Menu.buildFromTemplate(menuTemplate(win, app));

    const appIcon = new Tray(iconPath);

    appIcon.setContextMenu(ctxMenu);
    appIcon.addListener("click", (e) => {
        e.preventDefault();
        toggleWindowVisibility(win);
    });
};
