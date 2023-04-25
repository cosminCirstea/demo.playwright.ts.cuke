import { page } from '../steps/world';
import { getCssByClass, getCssById } from './selectors';

export function getLocatorById(idValue: string) {
  return page.locator(getCssById(idValue));
}

export function getLocator(selector: string) {
  return page.locator(selector);
}

export function getLocatorByClass(classValue: string) {
    return page.locator(getCssByClass(classValue));
}