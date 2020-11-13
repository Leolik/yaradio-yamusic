import * as ElectronStore from "electron-store";

export interface SettingsModel {
  notifications: boolean;
  quitOnClose: boolean;
}

class Store implements StoreType {

  constructor(private readonly instance: ElectronStore<StoreType>) { }

  get lastApp(): string {
    return this.instance.get('lastApp');
  }

  set lastApp(value: string) {
    this.instance.set('lastApp', value);
  }

  get lastWindowState(): Electron.Rectangle {
    return this.instance.get('lastWindowState');
  }

  set lastWindowState(value: Electron.Rectangle) {
    this.instance.set('lastWindowState', value);
  }

  get quit(): boolean {
    return this.instance.get('quit');
  }

  set quit(value: boolean) {
    this.instance.set('quit', value);
  }

  get settings(): SettingsModel {
    return this.instance.get('settings');
  }

  set settings(value: SettingsModel) {
    this.instance.set('settings', value);
  }
}

const defaultSettings: SettingsModel = {
  notifications: true,
  quitOnClose: true
};

export interface StoreType {
  lastApp: string;
  lastWindowState: Electron.Rectangle;
  quit: boolean;
  settings: SettingsModel;
}


const electronStore = new ElectronStore<StoreType>({
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

electronStore.set("quit", false);

export const store: StoreType = new Store(electronStore);
