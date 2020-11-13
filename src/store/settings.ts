import { StoreType, store as instance, SettingsModel } from "./store";

class Settings implements SettingsModel {
    constructor(private store: StoreType) { }

    get notifications(): boolean {
        return this.store.settings.notifications;
    }

    set notifications(value: boolean) {
        const current = this.store.settings;
        current.notifications = value;
        this.store.settings = current;
    }

    get quitOnClose(): boolean {
        return this.store.settings.quitOnClose;
    }

    set quitOnClose(value: boolean) {
        const current = this.store.settings;
        current.quitOnClose = value;
        this.store.settings = current;
    }
}

export const settings = new Settings(instance);

