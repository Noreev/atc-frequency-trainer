const phoneticAlphabet: Record<string, string> = {
  A: "Alpha",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliett",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu",
};


const numbers: Record<string, string> = {
  "0": "Zero",
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Nine",
};


const airlines: Record<string, string> = {
  AFR: "Air France",
  BAW: "Speedbird",
  DLH: "Lufthansa",
  EZY: "Easy",
  RYR: "Ryanair",
  EAP: "Aeropyrenees",
};


export function callsignToSpeech(
  callsign: string
): string {

  callsign = callsign.toUpperCase();


  const airlineCode = callsign.substring(0,3);
  const numberPart = callsign.substring(3);


  // Cas d'un vol commercial
  if (airlines[airlineCode]) {

    const airlineName = airlines[airlineCode];

    const numbersSpoken = numberPart
      .split("")
      .map(number => numbers[number])
      .join(" ");


    return `${airlineName} ${numbersSpoken}`;
  }


  // Cas immatriculation avion privé
  return callsign
    .split("")
    .map(character => {

      if (phoneticAlphabet[character]) {
        return phoneticAlphabet[character];
      }

      if (numbers[character]) {
        return numbers[character];
      }

      return character;

    })
    .join(" ");
}