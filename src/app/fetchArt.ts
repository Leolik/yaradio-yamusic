import fs = require("mz/fs");
import rp = require("request-promise");
import { getAlbumArtFile } from "./media";

export const fetchAlbumArt = async (imageUrl: string): Promise<boolean> => {
    const dataImg = await rp.get(imageUrl, { encoding: "binary" })
        .catch((err) => {
            console.error("Download image", err);
        });

    if (!dataImg) {
        return false;
    }
    let result = true;
    await fs.writeFile(getAlbumArtFile(), dataImg, { encoding: "binary" })
        .catch((err) => {
            console.error("Write image to a file", err);
            result = false;
        });

    return result;
}