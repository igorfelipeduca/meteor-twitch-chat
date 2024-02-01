export function generateRandomHexCode() {
  const randomInt = Math.floor(Math.random() * 16777216);

  const hexCode = randomInt.toString(16).padStart(6, "0");

  return "#" + hexCode;
}
