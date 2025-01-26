export const toTitleCase = (str: string) =>
  str.replace(/(^|\s+)(\w)/g, (_, prefix, char) => prefix + char.toUpperCase());
