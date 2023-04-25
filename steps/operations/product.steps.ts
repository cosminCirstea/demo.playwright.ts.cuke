import { DataTable, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ADD_TO_CART_BTN, REMOVE_BTN, getButtonSelectorByNameAndProduct } from '../../helpers/buttons';
import { getLocator, getLocatorByClass, getLocatorById } from '../../helpers/locators';
import { getCssByClass, getText, getXpath } from '../../helpers/selectors';
import { finishPurchase, initiateCheckout, openCart, productAndCartActions } from '../../operations/product';
import { page } from '../world';

/**
 * This method can add any product to the cart based on the product name
 */
When('I add the product {string} to the cart', async (productName: string) => {
  await productAndCartActions(ADD_TO_CART_BTN, productName);
});

/**
 * opens the cart and checks that it has been opened by looking for the cart content container element
 */
When('I open the cart', async () => {
  await openCart();
  await expect(getLocatorById('cart_contents_container')).toBeVisible();
});

/**
 * Verification method to check how many product types are in the cart and how many pieces of each type are there
 * I check the length of the list of product names to determine how many product types there are
 * I get the list of the cart quantity elements that have the desired quantity number and check their length.
 * I had issues getting the list directly and getting their textContent or InnerText, as it was not returning anything.
 * Perhaps if I'd try more, I could make it work, which would be a simpler, better way and more robust.
 * This approach is currently doing its job, 
 * but I can foresee some limitations if someone would want to check products with different quantities, so it can be improved.
 */
Then(
  'I see that the number of products in my cart is {int} with a quantity of {int} for each',
  async (expectedProductCount: number, expectedProductQuantity: string) => {
    expect((await page.$$(getCssByClass('inventory_item_name'))).length).toEqual(expectedProductCount);
    const productsWithQuantity = (await page.$$(getXpath('div', 'class', 'cart_quantity') + getText(expectedProductQuantity))).length;
    expect(productsWithQuantity).toEqual(expectedProductCount);
  }
);

/**
 * This method can remove any product from the cart by its name
 */
When('I remove the {string} product from the cart', async (productName: string) => {
  await productAndCartActions(REMOVE_BTN, productName);
});

/**
 * Verification method to check that I have all the products I'm expecting in the cart by name
 * Using the DataTable from Cucumber, the method is flexible to accept any number of productNames for verification
 */
Then('I see that I have in the cart the following products:', async (dataTable: DataTable) => {
  const tableData = dataTable.raw();
  for (const row of tableData) {
    for (const cell of row) {
      await expect(getLocator(getButtonSelectorByNameAndProduct(REMOVE_BTN, cell))).toBeVisible();
    }
  }
});

/**
 * Initiaties checkout by providing personal details. As mentioned, I decided to make a multiple-step checkout process
 * because I felt that the user would want to check again after actually paying.
 * I could make it in a single step though, by using a dataTable to integrate the user's checks before finishing the purchase
 * That would be better UX for the person writing scenarios in the BDD feature files.
 */
When(
  'I initiate checkout using my name {string} {string} and postalCode {string}',
  async (firstName: string, lastName: string, postalCode: string) => {
    await initiateCheckout(firstName, lastName, postalCode);
  }
);

When('I finish the purchase', async () => {
  await finishPurchase();
});

/**
 * Since there is no order tab to check for confirmation, currently the only way to verify that
 * the purchase has been done succesfully is by checking the checkout complete container, the header for the message,
 * to contain the expected success message and the button to get back to the products. 
 */
Then('my order is confirmed', async () => {
  await expect(getLocatorById('checkout_complete_container')).toBeVisible();
  const completeHeaderText = await getLocatorByClass('complete-header').textContent();
  expect(completeHeaderText).toEqual('Thank you for your order!');
  await expect(getLocatorById('back-to-products')).toBeVisible();
});
