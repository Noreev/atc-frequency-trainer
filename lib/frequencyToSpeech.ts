const numbers: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
};


function convertDigits(value: string): string {
  return value
    .split("")
    .map(number => numbers[number])
    .join(" ");
}


export function frequencyToSpeech(
  frequency: string
): string {

  const [integer, decimal] = frequency.split(".");


  // Suppression des zéros à la fin
  const cleanedDecimal = decimal.replace(/0+$/, "");


  return `${convertDigits(integer)} decimal ${convertDigits(cleanedDecimal)}`;
}