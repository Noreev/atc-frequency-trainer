import { ElevenLabsClient } from "elevenlabs";


const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});


export async function POST(req: Request) {

  const { text } = await req.json();


  const audio =
    await client.textToSpeech.convert(
      "21m00Tcm4TlvDq8ikWAM",
      {
        text,
        model_id: "eleven_multilingual_v2",
        output_format: "mp3_44100_128",
      }
    );


  const chunks = [];

  for await (const chunk of audio) {
    chunks.push(chunk);
  }


  const buffer = Buffer.concat(chunks);


  return new Response(buffer, {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });

}