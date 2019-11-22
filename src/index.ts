import { app, BrowserWindow, session, nativeTheme } from "electron";
import * as fs from "mz/fs";
import * as path from "path";
import { setAppBasePath, getRuntimePath } from "./app/media";
import { nextSongHandler } from "./app/nextSong";
import { currentPlatform, PlatformType } from "./app/platform";
import { createWindow } from "./app/window";
import { register as registerContextMenu } from "./controls/contextMenu";
import { register as registerDockMenu } from "./controls/dockMenu";
import { register as registerGlobalShortcuts } from "./controls/globalShortcut";
import { register as registerTaskbarMenu } from "./controls/taskbarMenu";
import { settings } from "./store/settings";
import { store } from "./store/store";

let win: BrowserWindow;
const appRunning = app.requestSingleInstanceLock();

if (!appRunning) {
  app.quit();
}

setAppBasePath(app);

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized() || !win.isVisible()) {
      win.restore();
    }
    win.focus();
  }
});

app.on("ready", () => {
  const lastWindowState = store.get("lastWindowState");
  const lastApp = store.get("lastApp");
  win = createWindow(lastWindowState);

  nativeTheme.addListener("updated", () => {
    registerContextMenu(win, app);
  });

  if (process.env.node_env === "dev") {
    win.webContents.openDevTools({
      mode: "undocked"
    });
  }

  win.on("close", (e) => {
    if (settings.quitOnClose) {
      return;
    }

    if (!store.get("quit")) {
      e.preventDefault();
    }

    switch (currentPlatform.type) {
      case PlatformType.Windows:
        win.hide();
        break;
      case PlatformType.Linux:
        win.hide();
        break;
      case PlatformType.MacOs:
        app.hide();
        break;
      default:
    }
  });

  win.loadURL((() => {
    if (lastApp === "YaMusic") {
      return "https://music.yandex.ru/";
    }
    return "https://radio.yandex.ru/";
  })());

  win.setMenu(null);
  registerContextMenu(win, app);
  registerGlobalShortcuts(win, app);
  if (currentPlatform.isMacOs) {
    registerDockMenu(win, app);
  }

  const page = win.webContents;
  page.on("dom-ready", () => {
    page.insertCSS(fs.readFileSync(path.join(getRuntimePath(), "css", "styles.css"), "utf8"));
    win.show();
  });

  const notify = nextSongHandler(win);

  session.defaultSession.webRequest.onBeforeRequest({ urls: ["*://*/*"] }, (details, callback) => {
    if (/awaps.yandex.net/.test(details.url)
      || /vh-bsvideo-converted/.test(details.url)
      || /get-video-an/.test(details.url)) {
      callback({ cancel: true });
      return;
    }
    // Notification for next song
    if (/start\?__t/.test(details.url)) {
      setTimeout(notify, 1000);
      if (currentPlatform.isWindows) {
        setTimeout(() => registerTaskbarMenu(win, app), 100);
      }
    }
    callback({});
  });
});

app.on("before-quit", () => {
  store.set("quit", true);

  if (!win.isFullScreen()) {
    store.set("lastWindowState", win.getBounds());
  }

  store.set("lastApp", win.getTitle());
});
