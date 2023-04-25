import { getLocatorByClass } from '../helpers/locators';
import { sortNumbersList } from '../helpers/string-utils';

/**
 * Dynamic locator to be able to select any sorting filter
 * @param sortingFilter by 'Name (A to Z)', 'Name (Z to A), Price (low to high) or Price (high to low)
 */
export async function selectSortingFilter(sortingFilter: string) {
  await getLocatorByClass('product_sort_container').selectOption(sortingFilter);
}

/**
 * I put together the sorting of string lists and number lists because there were too few differences in code
 * And especially on the feature file side. It made the most sense this way, even though I am not a fan of if-elses
 * However, someone writing scenarios using the feature file would see this as more user friendly
 * @param sortingAttribute - name or price
 * @param sortingType - asc or desc for name or price(e.g. A to Z / low to high or Z to A / high to low)
 * @param productListToSort the list of products to be sorted. This will contain product names or prices
 * @returns sorted list with product names or prices
 */
export async function sortProductList(sortingAttribute: string, sortingType: string, productListToSort: (string | null)[]) {
  if (sortingAttribute.match('price')) {
    productListToSort = sortingType.match('(low to high)')
      ? sortNumbersList(productListToSort)
      : sortNumbersList(productListToSort).reverse();
  } else {
    productListToSort = sortingType.match('(A to Z)') ? productListToSort.sort() : productListToSort.sort().reverse();
  }
  return productListToSort;
}
