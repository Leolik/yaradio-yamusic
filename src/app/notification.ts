import { Notification } from "electron";
import { store } from "../store/store";
import { getAlbumArtFile, getIconFile } from "./media";

const create = (titleText: string, msg: string, imagePath: string): Notification => {
    return new Notification({
        title: titleText,
        icon: imagePath,
        body: msg,
        silent: true
    });
};

export const notify = (title: string, msg: string, albumArt: boolean): void => {
    if (!Notification.isSupported() || !store.settings.notifications) {
        return;
    }
    if (albumArt) {
        create(title, msg, getAlbumArtFile()).show();
    } else {
        create(title, msg, getIconFile("yamusic_64x64.png")).show();
    }
};
