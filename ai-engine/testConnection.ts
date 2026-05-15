import Groq from "groq-sdk";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testConnection(): Promise<void> {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: "Say hello from TestPilot AI!",
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

testConnection();