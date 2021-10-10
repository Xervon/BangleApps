(function () {
  return (function (back, ret) {
    function fillSettingsWithDefaults(settings) {
      if (settings.nextSlideKey == null) {
        settings.nextSlideKey = 0;
      }
      if (settings.prevSlideKey == null) {
        settings.prevSlideKey = 0;
      }
      if (settings.altNextSlideKey == null) {
        settings.altNextSlideKey = 2;
      }
      if (settings.altPrevSlideKey == null) {
        settings.altPrevSlideKey = 2;
      }
      if (settings.pauseKey == null) {
        settings.pauseKey = 0;
      }

      return settings;
    }

    function getSettingLabel (option, val) {
      switch (option) {
          case 'nextSlideKey':
          case 'altNextSlideKey':
            return nextSlideKeys[val]
          case 'prevSlideKey':
          case 'altPrevSlideKey':
            return prevSlideKeys[val]
          case 'pauseKey':
            return pauseKeys[val]
      }
    }

    const fileName = 'presenter.json';
    let settings = require('Storage').readJSON(fileName, 1) || {};

    let nextSlideKeys = [ 'N', 'Right', 'Down' ];
    let prevSlideKeys = [ 'P', 'Left', 'Up' ];
    let pauseKeys = [ 'B' ];

    function save(settings) {
      require('Storage').writeJSON(fileName, settings);
    }

    function setAndSave(key, value) {
      settings[key] = value;
      save(settings);
    }

    settings = fillSettingsWithDefaults(settings);

    if (ret) {
      let ret = {};
      for (let k in settings) {
        if (settings.hasOwnProperty(k)) {
          ret[k] = getSettingLabel(k, settings[k]);
        }
      }
      return ret;
    }

    let menu = {
      '< Back': back,
      'Next': {
        value: settings.nextSlideKey,
        min: 0,
        max: nextSlideKeys.length,
        format: m => getSettingLabel('nextSlideKey', m),
        onchange: m => setAndSave('nextSlideKey', m),
      },
      'Previous': {
        value: settings.prevSlideKey,
        min: 0,
        max: prevSlideKeys.length,
        format: m => getSettingLabel('prevSlideKey', m),
        onchange: m => setAndSave('prevSlideKey', m),
      },
      'Alt. Next': {
        value: settings.altNextSlideKey,
        min: 0,
        max: nextSlideKeys.length,
        format: m => getSettingLabel('altNextSlideKey', m),
        onchange: m => setAndSave('altNextSlideKey', m),
      },
      'Alt. Previous': {
        value: settings.altPrevSlideKey,
        min: 0,
        max: prevSlideKeys.length,
        format: m => getSettingLabel('altPrevSlideKey', m),
        onchange: m => setAndSave('altPrevSlideKey', m),
      },
      'Pause': {
        value: settings.pauseKey,
        min: 0,
        max: pauseKeys.length,
        format: m => getSettingLabel('pauseKey', m),
        onchange: m => setAndSave('pauseKey', m),
      },
    };

    E.showMenu(menu);
  });
})();
