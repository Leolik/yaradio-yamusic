import { BrowserWindow, MenuItemConstructorOptions } from "electron";
import { notify } from "../app/notification";
import { currentPlatform } from "../app/platform";
import { settings } from "../store/settings";

export const menuSettings: MenuItemConstructorOptions = {
    type: "submenu",
    label: "Настройки",
    submenu: [
        {
            type: "checkbox",
            label: "Уведомления",
            checked: settings.notifications,
            click: (): void => {
                const value = !settings.notifications;
                settings.notifications = value;
                notify("Настройки", value ? "Уведомления включены" : "Уведомления отключены", undefined);
            }
        },
        {
            enabled: !currentPlatform.isMacOs,
            type: "checkbox",
            label: "Сворачивать в трей при закрытии",
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
            label: "Воспроизведение | Пауза",
            click: (): void => win.webContents.send("play")
        },
        {
            label: "Следующий трек",
            click: (): void => win.webContents.send("next")
        },
        {
            type: "separator"
        },
        {
            label: "Нравится",
            click: (): void => win.webContents.send("like")
        },
        {
            label: "Не нравится",
            click: (): void => win.webContents.send("dislike")
        }
    ];
};
