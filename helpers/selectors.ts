export function getCssById(valueForIdAttribute: string) {
  return `#${valueForIdAttribute}`;
}

export function getCssByClass(valueForClassAttribute: string) {
  return `.${valueForClassAttribute}`;
}

export function getCssByContainedId(valueForIdAttribute: string) {
  return `#${valueForIdAttribute}*`;
}

export function getCssByContainedClass(valueForClassAttribute: string) {
  return `.${valueForClassAttribute}*`;
}

export function getCssByContainedValueForAttribute(attribute: string, valueForAttribute: string) {
  return `[${attribute}*=${valueForAttribute}]`;
}

export function getCssByDoubleContainedValueForAttribute(
  attribute: string,
  valueForAttribute: string,
  attribute2: string,
  valueForAttribute2: string
) {
  return (
    getCssByContainedValueForAttribute(attribute, valueForAttribute) + getCssByContainedValueForAttribute(attribute2, valueForAttribute2)
  );
}

export function getXpath(tag:string, attribute:string, valueForAttribute:string) {
  return `//${tag}[@${attribute}='${valueForAttribute}']`
}

export function getText(text:string) {
  return `[text()='${text}']`;
}
