const electronInstaller = require('electron-winstaller');

electronInstaller.createWindowsInstaller({
    appDirectory: './distr/win/Yandex.Music.App-win32-x64',
    outputDirectory: './distr/win/Yandex.Music.App-win32-x64-installer',
    exe: 'Yandex.Music.App.exe',
    name: 'YandexMusicApp',
    setupIcon: './media/icon/yamusic_64x64.ico'
}).then(() => {
    console.log('It worked!');
}, (e) => {
    console.log(`No dice: ${e.message}`);
});
