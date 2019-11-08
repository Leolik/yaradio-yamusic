import fs = require("mz/fs");
import notifier = require("node-notifier");
import path = require("path");
import rp = require("request-promise");
import { store } from "./../store/store";

const send = (title: string, msg: string, imageName: string) => {
  notifier.notify(
    {
      title: title || "YaRadio",
      icon: path.join(__dirname, "../../media/", imageName),
      message: msg || "-",
      sound: false,
      wait: false,
    },
    (err) => console.error("Error: Notifier", err)
  );
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
