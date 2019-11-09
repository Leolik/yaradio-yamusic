import { Notification } from "electron";
import * as path from "path";
import { store } from "./../store/store";
import fs = require("mz/fs");
import rp = require("request-promise");

const send = (title: string, msg: string, imageName: string) => {

    if (!Notification.isSupported || !store.get("settings").notifications) {
        return;
    }

    const notification = new Notification({
        title: title,
        icon: path.join(__dirname, "../../media/", imageName),
        body: msg,
    });

    notification.show();
};

export const notify = async (title: string, msg: string, img?: string) => {
    if (!store.get("settings").notifications) {
        return;
    }
    if (img) {
        const dataImg = await rp.get(img, { encoding: "binary" }).catch((err) => {
            console.log("Error: Notifier", err);
        });

        await fs.writeFile(path.join(__dirname, "../../media/", "100x100.jpeg"), dataImg, { encoding: "binary" })
            .catch((err) => {
                console.log("Error: Notifier", err);
            });

        send(title, msg, "100x100.jpeg");
        return;
    } else {
        send(title, msg, "icon/yaradio_64x64.png");
    }
};
