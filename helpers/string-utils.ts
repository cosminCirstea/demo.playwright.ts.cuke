export function replaceSpaceWithDash(originalString: string) {
  return originalString.replace(/ /g, '-');
}

export function removeFirstCharFromEachStringOfList(stringList: (string | null)[]): string[] {
  return stringList.map((str) => {
    return str == null ? '' : str.slice(1);
  });
}

export function sortNumbersList(list: (string | null)[]): string[] {
  const convertedStringToNumericValuesList = list.map((stringItem) => parseFloat(stringItem || '0'));
  return convertedStringToNumericValuesList.sort((numberItem1, numberItem2) => numberItem1 - numberItem2).map((item) => item.toString());
}
