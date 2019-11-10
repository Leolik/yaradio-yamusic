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

export const notify = async (title: string, msg: string, albumArt: boolean) => {
    if (!Notification.isSupported || !store.get("settings").notifications) {
        return;
    }
    if (albumArt) {
        create(title, msg, getAlbumArtFile()).show();
    } else {
        create(title, msg, getIconFile("yaradio_64x64.png")).show();
    }
};
