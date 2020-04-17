import { BrowserWindow, MenuItemConstructorOptions } from "electron";
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
            click: (): void => {
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
            click: (): void => {
                settings.quitOnClose = !settings.quitOnClose;
            }
        },
    ]
};

export const menuTemplate = (win: BrowserWindow): MenuItemConstructorOptions[] => {
    return [
        {
            label: "Play | Pause",
            click: (): void => win.webContents.send("play")
        },
        {
            label: "Next Track",
            click: (): void => win.webContents.send("next")
        },
        {
            type: "separator"
        },
        {
            label: "Like",
            click: (): void => win.webContents.send("like")
        },
        {
            label: "Dislike",
            click: (): void => win.webContents.send("dislike")
        }
    ];
};
