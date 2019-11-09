import * as path from "path";
import { App } from "electron";

export let appBasePath = __dirname;
export const fetchArtFileName = "100x100.jpeg";

export const setAppBasePath = (app: App) => {
    appBasePath = app.getAppPath();
};

export const getMediaPath = (): string => {
    return path.join(appBasePath, "media/");
};

export const getIconFile = (fileName: string): string => {
    return path.join(appBasePath, "media/icon/", fileName);
};

export const getAlbumArtFile = (): string => {
    return path.join(appBasePath, "media/", fetchArtFileName);
};
