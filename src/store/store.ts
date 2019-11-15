import * as Store from "electron-store";

export interface SettingsModel {
  notifications: boolean;
  quitOnClose: boolean;
}

const defaultSettings: SettingsModel = {
  notifications: true,
  quitOnClose: true
};

interface StoreType {
  lastApp: string;
  lastWindowState: Electron.Rectangle;
  quit: boolean;
  settings: SettingsModel;
}

export const store = new Store<StoreType>({
  defaults: {
    lastApp: "",
    lastWindowState: {
      x: -1,
      y: -1,
      width: 700,
      height: 848
    },
    quit: false,
    settings: defaultSettings,
  }
});

store.set("quit", false);
