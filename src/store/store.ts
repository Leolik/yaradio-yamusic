import * as Store from "electron-store";

export const store = new Store({
  defaults: {
    lastApp: "",
    lastWindowState: {
      x: -1,
      y: -1,
      width: 700,
      height: 848
    },
    quit: false,
    settings: {
      notifications: true,
    },
  }
});

store.set("quit", false);
