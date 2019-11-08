import { App, BrowserWindow, MenuItemConstructorOptions } from "electron";
import { notify } from "../notification/notification";
import { store } from "../store/store";
import { toggleWindowVisibility } from "../window";

export const menuTemplate = (win: BrowserWindow, app: App): MenuItemConstructorOptions[] => {
    return [
        {
            label: "Play | Pause",
            click: () => win.webContents.send("play")
        },
        {
            label: "Next Track",
            click: () => win.webContents.send("next")
        },
        {
            type: "separator"
        },
        {
            label: "Like",
            click: () => win.webContents.send("like")
        },
        {
            label: "Dislike",
            click: () => win.webContents.send("dislike")
        },
        {
            type: "separator"
        },
        {
            label: "Show/Hide App",
            click: () => toggleWindowVisibility(win)
        },
        {
            type: "submenu",
            label: "Settings",
            submenu: [{
                type: "checkbox",
                label: "Notification",
                checked: store.get("settings").notifications,
                click: () => {
                    const settings = store.get("settings");
                    const value = !settings.notifications;
                    notify("Settings", value ? "Notification enabled" : "Notification disabled", undefined);
                    settings.notifications = value;
                    store.set("settings", settings);
                }
            }]
        },
        {
            label: "Quit",
            click: () => app.quit()
        }
    ];
};
