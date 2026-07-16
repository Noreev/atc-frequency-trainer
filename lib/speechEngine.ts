export function speak(
  text: string,
  speed: number = 1,
  onEnd?: () => void
) {

  if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return;
  }


  const utterance = new SpeechSynthesisUtterance(text);


  const voices = window.speechSynthesis.getVoices();


  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      speak(text, speed);
    };
    return;
  }


const preferredVoice = voices.find(
  (voice) =>
    voice.name.includes("Microsoft David") &&
    voice.lang === "en-US"
);


  if (preferredVoice) {
    utterance.voice = preferredVoice;
    console.log(
      "ATC Voice selected:",
      preferredVoice.name
    );
  }


  utterance.rate = speed;
  utterance.pitch = 2;
  utterance.volume = 0.75;


  window.speechSynthesis.cancel();

utterance.onend = () => {

  if (onEnd) {
    onEnd();
  }

};

  window.speechSynthesis.speak(utterance);

}