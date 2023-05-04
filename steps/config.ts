import { LaunchOptions } from '@playwright/test';
const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
  ],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
  headless: false,
};

/**
 * This makes the connection between the env-cmdrc file and code. Values selection can be controled from npm scripts
 */
export const config = {
  browser: process.env.BROWSER || 'headlessChromium',
  browserOptions,
  environment: process.env.ENV || 'https://www.saucedemo.com/',
  user: process.env.USER || 'standard_user',
  password: process.env.PASSWORD || 'secret_sauce',
};
