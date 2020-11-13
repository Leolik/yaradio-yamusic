
export const enum AppPlatform {
    Other, Windows, MacOs, Linux
}

export class Platform {
    public isWindows = this.type === AppPlatform.Windows;
    public isMacOs = this.type === AppPlatform.MacOs;
    public isLinux = this.type === AppPlatform.Linux;
    constructor(public type: AppPlatform) { }
}

export const currentPlatform = createPlatform();

function createPlatform(): Platform {
    let type: AppPlatform;
    switch (process.platform) {
        case "win32":
            type = AppPlatform.Windows;
            break;
        case "linux":
            type = AppPlatform.Linux;
            break;
        case "darwin":
            type = AppPlatform.MacOs;
            break;
        default:
            type = AppPlatform.Other;
    }

    return new Platform(type);
}