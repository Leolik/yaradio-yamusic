import { ipcRenderer, webFrame } from "electron";

const el = {
  prefButton: ".page-root .settings",
  prefDialog: ".settings-stream.popup",
  mute: ".page-root .volume",
  play: ".page-station .player-controls__play",
  next: ".page-station .slider__item_next",
  prev: ".page-station .slider__item_prev",
  like: ".page-station .button.like_action_like",
  dislike: ".page-station .button.like_action_dislike",
  activeStation: ".page-index .station_playing"
};

function exec(command: string): void {
  void webFrame.executeJavaScript(`if (!window.a) a = new Mu.Adapter(); ${command};`);
}

function click(querySelector: string): void {
  const e: HTMLElement = document.querySelector(querySelector);
  if (e) {
    e.click();
  }
}

ipcRenderer.on("play", () => exec("a.togglePause()"));
ipcRenderer.on("next", () => exec("a.next()"));
ipcRenderer.on("prev", () => click(el.prev));
ipcRenderer.on("like", () => click(el.like));
ipcRenderer.on("dislike", () => click(el.dislike));
ipcRenderer.on("mute", () => exec("a.mute()"));
ipcRenderer.on("HQ", () => exec("a.toggleHQ()"));

// Remove href from yandex logo
document.onreadystatechange = (): void => {
  $("div.footer__left").find(".link").removeAttr("href");
  $("div.nav__level").find(".footer__static-text").find(".link").removeAttr("href");
};