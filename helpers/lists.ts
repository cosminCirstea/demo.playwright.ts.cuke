import { page } from '../steps/world';

export async function getTextContentList(selector: string) {
  return await Promise.all((await getElementList(selector)).map((element) => element.textContent()));
}

export async function getElementList(selector: string) {
  return await page.$$(selector);
}
