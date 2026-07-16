
import { frequencyToSpeech } from "./frequencyToSpeech";
import { callsignToSpeech } from "./callsignToSpeech";


const controllers = [
  "Marseille Approach",
  "Paris Approach",
  "Lyon Tower",
  "Nice Tower",
  "Bordeaux Ground",
  "Toulouse Approach",
  "Orly",
  "Rennes",
  "Seine",
  "Nantes",
  "Lille"
];


export function generateATCPhrase(
  callsign: string,
  frequency: string
): string {


  const controller =
    controllers[
      Math.floor(Math.random() * controllers.length)
    ];


  return `${callsignToSpeech(callsign)}, contact ${controller}, ${frequencyToSpeech(frequency)}.`;

}