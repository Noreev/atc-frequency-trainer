let noiseAudio: HTMLAudioElement | null = null;


export function startRadioNoise(
  difficulty: string
) {

  console.log("Starting radio noise:", difficulty);


  if (difficulty === "Easy") {
    return;
  }


  noiseAudio = new Audio("/radio-noise.mp3");

  noiseAudio.loop = true;


  if (difficulty === "Medium") {
    noiseAudio.volume = 0.5;
  }


  if (difficulty === "Hard") {
    noiseAudio.volume = 0.8;
  }


  noiseAudio.play()
    .then(() => {
      console.log("Radio noise playing");
    })
    .catch((error) => {
      console.error("Radio noise error:", error);
    });

}



export function stopRadioNoise() {

  if (noiseAudio) {

    noiseAudio.pause();

    noiseAudio.currentTime = 0;

    noiseAudio = null;

    console.log("Radio noise stopped");

  }

}