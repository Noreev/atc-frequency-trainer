import { callsignToSpeech } from "./callsignToSpeech";
import { frequencyToSpeech } from "./frequencyToSpeech";

  const stations = [
  "Paris Control",
  "Paris Approach",

  "Bordeaux Control",
  "Bordeaux Approach",
  "Bordeaux Tower",
  "Bordeaux Ground",

  "Marseille Control",
  "Marseille Approach",
  "Marseille Tower",

  "Nice Approach",
  "Nice Tower",
  "Nice Ground",

  "Lyon Approach",
  "Lyon Tower",

  "Toulouse Approach",
  "Toulouse Tower",

  "Nantes Approach",
  "Nantes Tower",

  "Lille Approach",

  "Brest Control",

  "Geneva Control",
  "Geneva Approach",

  "Brussels Control",

  "London Control",
  "London Approach",

  "Shannon Control",

  "Barcelona Approach",

  "Madrid Control",

  "Rome Control",

  "Zurich Approach"
];

export function generateATCScenario(
  callsign: string,
  frequency: string
) {

  const aircraft = callsignToSpeech(callsign);

  const station =
  stations[
    Math.floor(Math.random() * stations.length)
  ];

  return `${aircraft}, contact ${station}, ${frequencyToSpeech(frequency)}.`;

}