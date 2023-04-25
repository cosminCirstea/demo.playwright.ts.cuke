import { Then, When } from '@cucumber/cucumber';
import { selectSortingFilter, sortProductList } from '../../operations/sorting';
import { getCssByClass } from '../../helpers/selectors';
import { expect } from '@playwright/test';
import { getLocatorByClass } from '../../helpers/locators';
import { getTextContentList } from '../../helpers/lists';
import { removeFirstCharFromEachStringOfList } from '../../helpers/string-utils';

/**
 * function to sort products by any filter desired by the person implementing scenarios in the feature files
 * After selecting the desired sorting attribute, I made a check to see that the active option is indeed the one chosen
 */
When('I sort products by {string}', async (sortingAttribute: string) => {
  await selectSortingFilter(sortingAttribute);
  expect(await getLocatorByClass('active_option').textContent()).toEqual(sortingAttribute);
});

/**
 * The function to verify that sorting has been done succesfully by getting the list of product names or prices
 * I initially thought to make two different steps functions, but they were looking too much the same and would have been
 * annoing for the person implementing scenarios. Thus I parameterised the sortingAttribute to point to either price or names.
 * In case of choosing price as the sorting attribute, the first character from each item from the list is removed.
 * The first character from the item is the currency symbol. I need to get rid of it to convert the strings to numerical values.
 * I did it to apply mathematical sorting instead of alphabetical, which was reserved for names.
 */
Then('I see that the products are sorted {string} by {string}', async (sortingType: string, sortingAttribute: string) => {
  let productList = await getTextContentList(getCssByClass(`inventory_item_${sortingAttribute}`));
  if (sortingAttribute.match('price')) {
    productList = removeFirstCharFromEachStringOfList(productList);
  }
  let expectedProductList = productList.slice();
  expectedProductList = await sortProductList(sortingAttribute, sortingType, expectedProductList);
  expect(productList).toEqual(expectedProductList);
});
