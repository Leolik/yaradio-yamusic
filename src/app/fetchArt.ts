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
    try {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await fs.writeFile(getAlbumArtFile(), dataImg, { encoding: "binary" });
    } catch (error) {
        console.error("Write image to a file", error);
        result = false;
    }
    return result;
}