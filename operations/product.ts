import { CART_BTN, CHECKOUT_BTN, CONTINUE_BTN, FINISH_BTN } from '../helpers/buttons';
import { FIRST_NAME, LAST_NAME, POSTAL_CODE } from '../helpers/fields';
import { getLocator, getLocatorById } from '../helpers/locators';
import { getCssByDoubleContainedValueForAttribute } from '../helpers/selectors';
import { replaceSpaceWithDash } from '../helpers/string-utils';
import { ID } from '../helpers/tags';

/**
 * I noticed that the only difference between add or remove is the button css value, so I parameterised it to use for both
 * I replaced space with dash for the productName because a normal user will write in the feature file
 * the name of the buttons as they see it in UI, so I wanted to keep it as natural as possible for them
 * @param action can be 'add to cart' or 'remove'
 * @param productName to specify which product to add or remove
 */
export async function productAndCartActions(action: string, productName: string) {
  const productNameWithDash = replaceSpaceWithDash(productName).toLowerCase();
  await getLocator(getCssByDoubleContainedValueForAttribute(ID, action, ID, productNameWithDash)).click();
}

export async function openCart() {
  await getLocatorById(CART_BTN).click();
}

/**
 * I chose to not do all the checkout steps until the order is placed because I felt that for a user is natural to
 * stop and check again the products in the cart before actually handing out the money.
 * The only way I could have done it in a single function would have been to add the assertions within.
 * That is usually disliked, and it would have also been a bit hard to read.
 * The parameters to check how many products are there and how many of each would have been harder to integrate into the feature file
 * Even if in the code would have been no problem.
 * @param firstName 
 * @param lastName 
 * @param postalCode 
 */
export async function initiateCheckout(firstName: string, lastName: string, postalCode: string) {
  await getLocatorById(CHECKOUT_BTN).click();
  await getLocatorById(FIRST_NAME).fill(firstName);
  await getLocatorById(LAST_NAME).fill(lastName);
  await getLocatorById(POSTAL_CODE).fill(postalCode);
  await getLocatorById(CONTINUE_BTN).click();
}

export async function finishPurchase() {
  await getLocatorById(FINISH_BTN).click();
}
