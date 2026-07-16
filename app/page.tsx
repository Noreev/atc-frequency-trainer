"use client";

import { useState } from "react";
import { generateFrequency } from "../lib/frequencyGenerator";
import { generateATCScenario } from "../lib/atcScenarioGenerator";
import { speak } from "../lib/speechEngine";
import {startRadioNoise, stopRadioNoise} from "../lib/radioNoise";

export default function Home() {
  const [frequency, setFrequency] = useState("");
  const [phrase, setPhrase] = useState("");


  const [callsign, setCallsign] = useState("AFR264");
  const [speed, setSpeed] = useState(1);
  const [difficulty, setDifficulty] = useState("Medium");
 


  const [isPlaying, setIsPlaying] = useState(false);


  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess] = useState(0);

  const [selectedFrequency, setSelectedFrequency] = useState("118.000");

const checkAnswer = () => {



    const selected = Number(selectedFrequency);
const correct = Number(frequency);


if (selected === correct) {

  setScore(score + 1);

  setSuccess(success + 1);

  setResult("✅ Correct +1");


} else {

  setResult(
    `❌ Incorrect - Correct answer: ${frequency}`
  );

}


    setAttempts(attempts + 1);

    setAnswer("");

  };

  const changeFrequency = (
  type: "MHz" | "kHz",
  direction: number
) => {

  let current = Number(selectedFrequency);


  if (type === "MHz") {

    current += direction * 1;

  }


  if (type === "kHz") {

  let mhz = Math.floor(current);

  let khz = Math.round(
    (current - mhz) * 1000
  );


  khz += direction * 25;


  if (khz >= 1000) {
    khz = 0;
  }


  if (khz < 0) {
    khz = 975;
  }


  current = mhz + (khz / 1000);

}


  if (current < 118) {
    current = 118;
  }


  if (current > 136.975) {
    current = 136.975;
  }


  setSelectedFrequency(
    current.toFixed(3)
  );

};


  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        ✈️ ATC Frequency Trainer
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <label className="block font-semibold mb-2">
          Callsign
          
        </label>

        <input
        value={callsign}
         onChange={(e) => setCallsign(e.target.value)}
         className="border rounded-lg w-full p-3 mb-6"
         placeholder="AFR264"
         />


<label className="block font-semibold mb-2">
  Difficulty
</label>

        <select
  value={difficulty}
  onChange={(e)=>setDifficulty(e.target.value)}
  className="border rounded-lg w-full p-3 mb-6"
>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
</select>


        <label className="block font-semibold mb-2">
          Voice speed
        </label>

        <input
  type="range"
  min="1"
  max="5"
  step="0.2"
  value={speed}
  onChange={(e) => setSpeed(Number(e.target.value))}
  className="w-full mb-6"
/>
<div className="text-center text-gray-600 mb-4">
  Speed: {speed}x
</div>


        <button
  onClick={() => {

    const newFrequency = generateFrequency(
  difficulty
);

    setFrequency(newFrequency);


    const newPhrase = generateATCScenario(
      callsign,
      newFrequency,
    );


    setPhrase(newPhrase);
    
    startRadioNoise(difficulty);

    setIsPlaying(true);



speak(newPhrase, speed);

speak(
  newPhrase,
  speed,
  () => {
    stopRadioNoise();
    setIsPlaying(false);
  }
);

  }}
  
  className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg w-full p-3"
>
  START TRAINING
</button>

{isPlaying && (
  <div className="mt-4 text-center font-bold">
    🎙️ ATC SPEAKING...
  </div>
)}



<div className="mt-6">

  <label className="block font-semibold mb-2">
    Selected frequency
  </label>


  <div className="bg-black text-green-400 rounded-lg p-4 text-center mb-4">

    <div className="text-sm">
      COM ACTIVE
    </div>

    <div className="text-3xl font-mono">
      {selectedFrequency}
    </div>

  </div>

  <div className="flex justify-center items-center gap-6 mt-4">


  {/* GROSSE MOLETTE MHz */}

  <div className="flex flex-col items-center">

    <button
      onClick={() => changeFrequency("MHz", 1)}
      className="bg-gray-700 text-white rounded-full w-16 h-16 text-2xl"
    >
      ▲
    </button>


    <div className="text-sm mt-2">
      MHz
    </div>


    <button
      onClick={() => changeFrequency("MHz", -1)}
      className="bg-gray-700 text-white rounded-full w-16 h-16 text-2xl"
    >
      ▼
    </button>

  </div>



  {/* PETITE MOLETTE 25 kHz */}

  <div className="flex flex-col items-center">

    <button
      onClick={() => changeFrequency("kHz", 1)}
      className="bg-gray-400 text-white rounded-full w-12 h-12 text-xl"
    >
      ▲
    </button>


    <div className="text-sm mt-2">
      25 kHz
    </div>


    <button
      onClick={() => changeFrequency("kHz", -1)}
      className="bg-gray-400 text-white rounded-full w-12 h-12 text-xl"
    >
      ▼
    </button>

  </div>


</div>

</div>


<button

onClick={checkAnswer}

className="bg-green-600 text-white rounded-lg w-full p-3 mt-4"

>

CHECK

</button>

<div className="mt-6 text-center">

  <p className="font-bold text-xl">
    Score: {score}
  </p>


  <p>
    Accuracy: {
      attempts === 0
      ? 0
      : Math.round((success / attempts) * 100)
    }%
  </p>

</div>

{result && (

  <div className="mt-4 text-center font-bold">

    {result}

  </div>

)}
      </div>

    </main>
  );
}
