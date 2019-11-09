
export const enum PlatformType {
    Other, Windows, MacOs, Linux
}

export class Platform {
    constructor(public type: PlatformType) { }
    public isWindows = this.type === PlatformType.Windows
    public isMacOs = this.type === PlatformType.MacOs
    public isLinux = this.type === PlatformType.Linux
}

export const currentPlatform = createPlatform();

function createPlatform(): Platform {
    let type: PlatformType
    switch (process.platform) {
        case "win32":
            type = PlatformType.Windows;
            break;
        case "linux":
            type = PlatformType.Linux;
            break;
        case "darwin":
            type = PlatformType.MacOs;
            break;
        default:
            type = PlatformType.Other;
    }

    return new Platform(type);
}