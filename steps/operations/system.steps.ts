import { Given, Then, When } from '@cucumber/cucumber';
import { page } from '../world';
import { expect } from '@playwright/test';
import { config } from '../config';
import { login, logout, navigateToBaseUrl } from '../../operations/system';
import { getLocatorByClass, getLocatorById } from '../../helpers/locators';
import { MENU_BTN } from '../../helpers/buttons';
import { USERNAME } from '../../helpers/fields';

/**
 * I have created a thorough precondition to be logged in which does the url navigation, login and verifications
 * to be easier for tests tackling business scenarios
 */
Given('I am logged in the website', async () => {
  await navigateToBaseUrl();
  expect(page.url()).toEqual(config.environment);
  await login(config.user, config.password);
  await expect(getLocatorByClass('error-message-container')).toBeHidden();
  await expect(getLocatorById(MENU_BTN)).toBeVisible();
});

/**
 * I have split the url navigation to be able to have the login process separately and parameterised
 * to be able to test scenarios concerning the login operation
 */
Given('I am on the base url', async () => {
  await navigateToBaseUrl();
  expect(page.url()).toEqual(config.environment);
});

/**
 * the separate login action to test login operation scenarios
 */
When('I log in with the username {string} and password {string}', async (username: string, password: string) => {
  await login(username, password);
});

/**
 * the succesful login verifications
 */
Then('I am logged in succesfully', async () => {
  await expect(getLocatorByClass('error-message-container')).toBeHidden();
  await expect(getLocatorById(MENU_BTN)).toBeVisible();
});

Then('an error message is displayed', async () => {
  await expect(getLocatorByClass('error-message-container')).toBeVisible();
})

/**
 * logout action and verification
 */
Then('I am logged out', async () => {
  await logout();
  await expect(getLocatorById(USERNAME)).toBeVisible();
});
