const path = require('path');
const notifier = require('node-notifier');
const store = require('../store/store');
const rp = require('request-promise');
const fs = require('mz/fs')

/**
 * @param {string} title
 * @param {string} msg
 * @param {string} [img]
 * @param {boolean} [force]
 */
exports.notifi = async (title, msg, img, force) => {
  let sendNotify = function () {
    notifier.notify({
      title: title || 'YaRadio',
      message: msg || '-',
      icon: img ? path.join(__dirname, '../../media/', '100x100.jpeg') : path.join(__dirname, '../../media/icon', 'yaradio_64x64.png'),
      sound: false,
      wait: false
    },
     /**
     * @param {any} err
     */
    function (err) {
      if (err) {
        console.log('Error: Notifier', err);
      }
    })
  }

  if (store.get('settings.notifications')) {
    if (img) {
      let dataImg = await rp.get(img, { encoding: 'binary' }).catch((err) => {
        console.log('Error: Notifier', err);
      })

      await fs.writeFile(path.join(__dirname, '../../media/', '100x100.jpeg'), dataImg, { encoding: 'binary' }).catch((err) => {
        console.log('Error: Notifier', err);
      })

      sendNotify();
      return
    }

    sendNotify();
  } else if (force) {
    sendNotify();
  }
}