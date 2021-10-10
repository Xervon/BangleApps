let settings = eval(require('Storage').read('presenter.settings.js'))(null, true);

var kb = require("ble_hid_keyboard");
NRF.setServices(undefined, { hid : kb.report });

function press(key) {
  kb.tap(kb.KEY[key], 0);
}

if (global.env.BOARD === 'BANGLEJS') {
  let menu = {
    'Next Slide': () => press(settings.nextSlideKey),
    'Previous Slide': () => press(settings.prevSlideKey),
    'Alt. Next Slide': () => press(settings.altNextSlideKey),
    'Alt. Previous Slide': () => press(settings.altPrevSlideKey),
    'Pause Presentation': () => press(settings.pauseKey),
  };

  E.showMenu(menu);
} else if (global.env.BOARD === 'BANGLEJS2') {
} else if (global.env.BOARD === 'PUCKJS') {
  let pressKey;
  setWatch(function () {
    pressKey = settings.nextSlideKey;
  }, BTN, { edge: 'rising', repeat: true })
  setWatch(function () {
      press(pressKey);
  }, BTN, { edge: 'falling', repeat: true })

  require("puckjsv2-accel-movement").on();
  Puck.on('accel', function () {
    shouldNext = settings.prevSlideKey;
  });

  NRF.setAdvertising({},{
    name: "Presenter",
    manufacturer: 0x0590,
    interval: 600 // default is 375 - save a bit of power
  });
}
