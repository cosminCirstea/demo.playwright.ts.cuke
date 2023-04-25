import { getCssByContainedValueForAttribute } from './selectors';
import { replaceSpaceWithDash } from './string-utils';
import { ID } from './tags';

export const CART_BTN = 'shopping_cart_container';
export const LOGOUT_BTN = 'logout_sidebar_link';
export const MENU_BTN = 'react-burger-menu-btn';
export const LOGIN_BTN = 'login-button';
export const CHECKOUT_BTN = 'checkout';
export const CONTINUE_BTN = 'continue';
export const FINISH_BTN = 'finish';
export const ADD_TO_CART_BTN = 'add-to-cart';
export const REMOVE_BTN = 'remove';

/**
 * I have made this special buttonSelector for the purpose of UX for the person implementing scenarios in BDD
 * They don't have to check the html, only write the button name as they see it in UI, and the function takes care
 * of replacing spaces with dashes, as the html css attribute expects
 * @param buttonName - name of the button as seen in the UI
 * @returns returns the selector for a given button
 */
export function getButtonSelector(buttonName: string) {
  const spacedString = replaceSpaceWithDash(buttonName).toLowerCase();
  return getCssByContainedValueForAttribute(ID, spacedString);
}

/**
 * This function returns the selector for a given button that is tied to a product
 * for example if one wants to click the button add to cart or remove for a specific product
 * then they can do this by specifying the button name and product name, and this function returns
 * the selector accordingly for the desired button
 * @param buttonName 
 * @param productName 
 * @returns the selector for the desired button for the specified product
 */
export function getButtonSelectorByNameAndProduct(buttonName: string, productName: string) {
  return getButtonSelector(buttonName) + getButtonSelector(productName);
}
