import { AfterAll, After, BeforeAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { config } from './config';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';

let page: Page;
let browser: Browser;
let context: BrowserContext;

/**
 * If the tests fail to pass over a step in 30 seconds, it will timeout
 */
setDefaultTimeout(30000);

/**
 * The browser can be selected to run the tests on. I chose this approach to be able to control it from npm scripts
 */
BeforeAll(async () => {
  switch (config.browser) {
    case 'firefox':
      browser = await firefox.launch(config.browserOptions);
      break;
    case 'headlessFirefox':
      browser = await firefox.launch({ headless: true });
      break;
    case 'webkit':
      browser = await webkit.launch(config.browserOptions);
      break;
    case 'headlessWebkit':
      browser = await webkit.launch({ headless: true });
      break;
    case 'headlessChromium':
      browser = await chromium.launch({ headless: true });
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  context = await browser.newContext();
  page = await context.newPage();
  return page;
});

/**
 * On scenario failure screenshots are taken by Playwright and attached to the html-cucumber-report
 */
After(async function (Scenario) {
  if (Scenario.result?.status === Status.FAILED) {
    this.attach(
      await page.screenshot({
        path: `./screenshots/$(Scenario.pickle.name).png`,
        fullPage: true,
      }),
      'image/png'
    );
  }
});

/**
 * Close the browser and session after features run
 */
AfterAll(async () => {
  await context?.close();
  await browser.close();
});

export { page, browser };
