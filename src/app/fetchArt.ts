import fetch from "node-fetch";
import { getAlbumArtFile } from "./media";
import { writeFile } from "./writeFile";

export const fetchAlbumArt = async (imageUrl: string): Promise<void> => {
    try {
        const response = await fetch(imageUrl);
        const dataImg = await response.buffer();
        await writeFile(getAlbumArtFile(), dataImg, { encoding: "binary" });
    } catch (error) {
        console.error("Download image", error);
        throw error;
    }
}