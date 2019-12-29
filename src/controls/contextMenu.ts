import { App, BrowserWindow, Menu, nativeTheme, Tray } from "electron";
import { getIconFile } from "./../app/media";
import { currentPlatform } from "./../app/platform";
import { menuSettings, menuTemplate } from "./template";

let appIcon: Tray;

export const register = (win: BrowserWindow, app: App) => {
    if (appIcon) {
        appIcon.destroy();
        appIcon = undefined;
    }

    const items = menuTemplate(win, app);
    items.push(
        {
            type: "separator"
        },
        {
            label: "Show",
            click: () => win.show()
        },
        {
            label: "Hide",
            click: () => win.hide()
        },
        menuSettings,
        {
            label: "Quit",
            click: () => app.quit()
        }
    );
    const ctxMenu = Menu.buildFromTemplate(items);

    appIcon = new Tray(getIconFile(contextMenuIcon()));
    appIcon.setContextMenu(ctxMenu);
    appIcon.addListener("click", (e) => {
        e.preventDefault();
        win.show();
    });
};

function contextMenuIcon(): string {
    if (currentPlatform.isLinux) {
        return "yaradio_16x16.png";
    }
    if (nativeTheme.shouldUseDarkColors) {
        return "yaradio_16x16_mono_white.png";
    } else {
        return "yaradio_16x16_mono_black.png";
    }
}

