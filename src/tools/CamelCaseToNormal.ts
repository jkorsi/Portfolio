export function CamelCaseToNormal(key: string): string {
  // Example usage
  //const headings = Object.keys(data).map((key) => CamelCaseToNormal(key));
  // Split the key by camel case
  const words = key.split(/(?=[A-Z])|(?=[A-Z])(?=[0-9])|(?=[0-9])(?=[A-Z])/);

  // Join the words with a space and convert to title case
  const formattedHeading = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const numbersSeparated = formattedHeading
    .replace(/([a-zA-Z])([0-9])/g, "$1 $2")
    .replace(/([0-9])([a-zA-Z])/g, "$1 $2");

  return numbersSeparated;
}

export function NormalToCamelCase(str: string): string {
  // Remove any leading or trailing spaces
  const trimmedStr = str.trim();

  // Split the string by spaces or special characters
  const words = trimmedStr.split(/[^\w]+/);

  // Convert the words to camel case
  const camelCased = words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");

  return camelCased;
}
