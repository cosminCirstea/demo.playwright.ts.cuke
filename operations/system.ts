import { LOGIN_BTN, LOGOUT_BTN, MENU_BTN } from '../helpers/buttons';
import { PASSWORD, USERNAME } from '../helpers/fields';
import { getLocatorById } from '../helpers/locators';
import { config } from '../steps/config';
import { page } from '../steps/world';

export async function navigateToBaseUrl() {
  await page.goto(config.environment);
}

export async function login(username: string, password: string) {
  await getLocatorById(USERNAME).fill(username);
  await getLocatorById(PASSWORD).fill(password);
  await getLocatorById(LOGIN_BTN).click();
}

export async function logout() {
  await getLocatorById(MENU_BTN).click();
  await getLocatorById(LOGOUT_BTN).click();
}
