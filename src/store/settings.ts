import * as Store from "electron-store";
import { store as instance, SettingsModel } from "./store";

class Settings implements SettingsModel {
    constructor(private store: Store) { }

    get notifications(): boolean {
        return this.settings.notifications;
    }

    set notifications(value: boolean) {
        this.update(current => { current.notifications = value; });
    }

    get quitOnClose(): boolean {
        return this.settings.quitOnClose;
    }

    set quitOnClose(value: boolean) {
        this.update(current => { current.quitOnClose = value; });
    }

    private get settings(): SettingsModel {
        return this.store.get("settings");
    }

    private update(callback: (current: SettingsModel) => void): void {
        const current = this.settings;
        callback(current);
        this.store.set("settings", current);
    }
}

export const settings = new Settings(instance);

