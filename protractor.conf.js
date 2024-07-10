// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const os = require("os");

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 600000,
  specs: [
    './src/e2e/*.ts'
  ],
  chromeDriver: whereIsChromeDriver(),
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        // "--headless",
        // "--window-size=1920,1080",

        // "--incognito",
        "--start-maximized"
      ]
    }
  },

  SELENIUM_PROMISE_MANAGER: false,

  directConnect: true,

  baseUrl: 'http://localhost:4200/',

  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 10000,
    print: function() {}
  },

  async onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });

    jasmine.getEnv().addReporter(new SpecReporter({
      // https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts
      spec: {
        displayStacktrace: false
      }
    }));

    /**
     * @type { import("protractor").ProtractorBrowser }
     */
    const browser = global['browser'];
    browser.manage().timeouts().implicitlyWait(2000);
  }
};

function whereIsChromeDriver() {
  if (isMac()) {
    return './chromedriver-mac-x64/chromedriver';
  }
  else{
    return './chromedriver-win32/chromedriver.exe';
  }
}

function isMac() {
  const os = require('os');
  return (os.platform() === 'darwin');
}
