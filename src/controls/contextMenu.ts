import { App, BrowserWindow, Menu, Tray } from "electron";
import * as path from "path";
import { toggleWindowVisibility } from "../window";
import { menuTemplate, menuSettings } from "./template";

const iconPath = path.join(__dirname, "../", "media/icon", "yaradio_16x16.png");
let appIcon: Tray;

export const register = (win: BrowserWindow, app: App) => {
    const items = menuTemplate(win, app);
    items.push(
        {
            type: "separator"
        },
        {
            label: "Show/Hide App",
            click: () => toggleWindowVisibility(win)
        },
        menuSettings,
        {
            label: "Quit",
            click: () => app.quit()
        }
    );
    const ctxMenu = Menu.buildFromTemplate(items);
    appIcon = new Tray(iconPath);

    appIcon.setContextMenu(ctxMenu);
    appIcon.addListener("click", (e) => {
        e.preventDefault();
        toggleWindowVisibility(win);
    });
};
