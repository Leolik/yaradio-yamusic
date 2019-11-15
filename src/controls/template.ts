import { App, BrowserWindow, MenuItemConstructorOptions } from "electron";
import { notify } from "../app/notification";
import { settings } from "../store/settings";
import { currentPlatform } from "../app/platform";

export const menuSettings: MenuItemConstructorOptions = {
    type: "submenu",
    label: "Settings",
    submenu: [
        {
            type: "checkbox",
            label: "Notification",
            checked: settings.notifications,
            click: () => {
                const value = !settings.notifications;
                settings.notifications = value;
                notify("Settings", value ? "Notification enabled" : "Notification disabled", undefined);
            }
        },
        {
            enabled: !currentPlatform.isMacOs,
            type: "checkbox",
            label: "Minimize on close",
            checked: !settings.quitOnClose,
            click: () => {
                settings.quitOnClose = !settings.quitOnClose;
            }
        },
    ]
};

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
        }
    ];
};
