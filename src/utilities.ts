// Alphabet, excluding I and O
const garsLetters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

/**
 * This function returns the GARS latitude string for a given latitude
 * @param {number} lat - Latitude
 * @returns {string} - GARS Latitude letters
 */
function getGARSLetters(lat: number): string {
  const difference: number = lat - -90;
  // Difference in degrees divided by 24 total GARS letters (at 0.5 degrees each)
  const firstChar: string = garsLetters[Math.floor(difference / 12)];
  // The remainder of the modulus indicates the number of degrees North we must traverse.
  // Dividing by 0.5 degrees indicates the final index in the garsLetters array
  const secondChar: string = garsLetters[Math.floor((difference % 12) / 0.5)];

  return firstChar + secondChar;
}

/**
 * This function returns the GARS longitude string for a given longitude
 * @param {number} lng - Longitude
 * @returns {string} - A GARS longitude string
 */
function getGARSNumbers(lng: number): string {
  let count: number = 1;
  while (lng > -180) {
    lng -= 0.5;
    count++;
  }

  let result: string = count.toString();

  while (result.length < 3) {
    result = '0' + result;
  }
  return result;
}

export { getGARSLetters, getGARSNumbers };
