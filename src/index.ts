import { app, BrowserWindow, session } from "electron";
import * as path from "path";
import { register as registerContextMenu } from "./controls/contextMenu";
import { register as registerDockMenu } from "./controls/dockMenu";
import { register as registerGlobalShortcuts } from "./controls/globalShortcut";
import { register as registerTaskbarMenu } from "./controls/taskbarMenu";

import { notifyNextSongHandler } from "./notification/nextSong";
import { store } from "./store/store";
import fs = require("mz/fs");
import { currentPlatform, PlatformType } from "./platform";

if (process.env.node_env === "dev") {
  // tslint:disable-next-line: no-var-requires
  require("electron-debug")({
    enabled: true,
    showDevTools: "undocked"
  });
}

let win: BrowserWindow;
const appRunning = app.requestSingleInstanceLock();

if (!appRunning) {
  app.quit();
}

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  }
});

function createWindow() {
  const lastWindowState = store.get("lastWindowState");
  const lastApp = store.get("lastApp");

  const titleBarStyle = (currentPlatform.isMacOs) ? "customButtonsOnHover" : "hiddenInset";
  const mainWindow = new BrowserWindow({
    title: "Yandex.Music.App - Unofficial",
    show: false,
    x: lastWindowState.x === -1 ? undefined : lastWindowState.x,
    y: lastWindowState.y === -1 ? undefined : lastWindowState.y,
    height: lastWindowState.height || 700,
    width: lastWindowState.width || 848,
    icon: path.join(__dirname, "media/icon", "yaradio_32x32.png"),
    titleBarStyle: titleBarStyle,
    movable: true,
    minHeight: 700,
    minWidth: 848,
    autoHideMenuBar: true,
    backgroundColor: "#fff",
    webPreferences: {
      preload: path.join(__dirname, "runtime/js", "browser.js"),
      nodeIntegration: false,
      plugins: true
    }
  });

  mainWindow.loadURL((() => {
    if (lastApp === "YaMusic") {
      return "https://music.yandex.ru/";
    }
    return "https://radio.yandex.ru/";
  })());

  mainWindow.on("close", (e) => {
    if (!store.get("quit")) {
      e.preventDefault();
    }

    switch (currentPlatform.type) {
      case PlatformType.Windows:
        mainWindow.hide();
        break;
      case PlatformType.Linux:
        mainWindow.hide();
        break;
      case PlatformType.MacOs:
        app.hide();
        break;
      default:
    }
  });
  
  return mainWindow;
}

app.on("ready", () => {
  win = createWindow();
  registerContextMenu(win, app);
  registerGlobalShortcuts(win, app);
  if (currentPlatform.isMacOs) {
    registerDockMenu(win, app);
  }
  if (currentPlatform.isWindows) {
    registerTaskbarMenu(win, app);
  }
  win.setMenu(null);

  const page = win.webContents;
  page.on("dom-ready", () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, "/runtime/css", "styles.css"), "utf8"));
    win.show();
  });

  const notify = notifyNextSongHandler(win);

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
