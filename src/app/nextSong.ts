import { notify } from "./notification";
import { BrowserWindow } from "electron";
import { fetchAlbumArt } from "./fetchArt";

const getTrack = `
  ;(function(){
    let trackName, trackVer;
    if(/radio/.test(location.hostname)){
      trackName = document.querySelector('.player-controls__title') && document.querySelector('.player-controls__title').getAttribute('title') || ''
      return trackName
    }

    trackName = document.querySelector('.track__title') && document.querySelector('.track__title').textContent || ''
    trackVer = (document.querySelector('.track__ver') && document.querySelector('.track__ver').textContent) || ''
    return trackName + ' ' + trackVer
  })();
`;
const getArtist = `
  ;(function(){
    let trackArtist;
    if(/radio/.test(location.hostname)){
      trackArtist = document.querySelector('.player-controls__artists') && document.querySelector('.player-controls__artists').getAttribute('title') || ''
      return trackArtist
    }

    trackArtist = document.querySelectorAll('.track__artists a')
    return Array.from(trackArtist).map((e)=> e.textContent).join(', ')
  })();
`;
const getImg = `
  ;(function(){
    let trackImg;
    if(/radio/.test(location.hostname)){
      trackImg = document.querySelector('.slider__item_playing .track__cover') && document.querySelector('.slider__item_playing .track__cover').style.backgroundImage || ''
      return 'https:' + trackImg.replace('url("','').replace('")','').replace(/\d+x\d+/, '100x100')
    }

    trackImg = document.querySelector('.track-cover img') && document.querySelector('.track-cover img').getAttribute('src') || ''
    return 'https:' + trackImg.replace(/\d+x\d+/, '100x100')
  })();
`;

async function getInfoFromDOM(command: string, win: BrowserWindow): Promise<string> {
  return await (win.webContents.executeJavaScript(command) as Promise<string>);
}

async function fetchAndNotify(win: BrowserWindow): Promise<void> {
  const [track, artist, image] = await Promise.all([
    getInfoFromDOM(getTrack, win),
    getInfoFromDOM(getArtist, win),
    getInfoFromDOM(getImg, win)
  ]);
  if (track && artist) {
    if (image) {
      try {
        await fetchAlbumArt(image);
        notify(track, artist, true);
      } catch (error) {
        notify(track, artist, false);
      }
    } else {
      notify(track, artist, false);
    }
  }
}

export const nextSongHandler = (win: BrowserWindow) => {
  return (): void => {
    fetchAndNotify(win).catch(error => console.error(error));
  }
};
