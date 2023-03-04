import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // don't forget to create ".env" file with the line "OPENAI_API_KEY=your_secret_key here"
});
const openai = new OpenAIApi(configuration);

async function chat(prompt, setup) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: setup || "Answer as a pirate" },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // extract the answer from response
  const answer = response.data.choices[0].message.content;

  return answer;
}

const setup = `Answer as a Batman`;
const prompt = `Say hello to my YouTube subscribers, 
it's 20-ish of them yet.`;

console.log(await chat(prompt, setup));
