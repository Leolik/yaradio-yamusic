import { BrowserWindow, Menu, App } from "electron";
import { menuTemplate } from "./template";

export const register = (win: BrowserWindow, app: App) => {
  const dockMenu = Menu.buildFromTemplate(menuTemplate(win, app));

  if (app.dock.setMenu) {
    app.dock.setMenu(dockMenu);
  }
};
