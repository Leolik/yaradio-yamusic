import { App, BrowserWindow, Menu, Tray } from "electron";
import { toggleWindowVisibility } from "../app/window";
import { getIconFile } from "./../app/media";
import { menuSettings, menuTemplate } from "./template";

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
    appIcon = new Tray(getIconFile("yaradio_16x16.png"));

    appIcon.setContextMenu(ctxMenu);
    appIcon.addListener("click", (e) => {
        e.preventDefault();
        toggleWindowVisibility(win);
    });
};
