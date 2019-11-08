const Store = require('electron-store');
const store = new Store({
  defaults: {
    settings: {
      notifications: true
    },
    lastApp: '',
    lastWindowState: {},
    quit: false
  }
});

store.set('quit', false);

module.exports = store