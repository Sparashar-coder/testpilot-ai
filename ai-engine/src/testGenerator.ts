import Groq from "groq-sdk";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

import { apiTestPrompt } from "../prompts/apiTestPrompt";
import { uiTestPrompt } from "../prompts/uiTestPrompt";
dotenv.config({ path: "../.env" });

const groq = new Groq({apiKey : process.env.GROQ_API_KEY});

async function generateAPITests(endpoint : string , method:string ,description : string) : Promise<void>{

    console.log(`Generating API Test cases for ${endpoint}`);

    const prompt = apiTestPrompt(endpoint , method,description);

    const response = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",
        messages:[{role:"user", content:prompt}],
        temperature:0.3
    });

    const rawContent = response.choices[0].message.content ?? "";

    const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
    if(!jsonMatch){
        throw new Error("No JSON array found in response");
    }

    const testcases = JSON.parse(jsonMatch[0]);

    const outputPath = path.join(__dirname, "..", "output", "api-testcases.json");
    fs.writeFileSync(outputPath ,JSON.stringify(testcases,null,2));

    console.log(`✅ API Test cases saved to output/api-testcases.json`);

} 

async function generateUITests(
    pageUrl: string,
    pageDescription: string
  ): Promise<void> {
    console.log(`Generating UI test cases for: ${pageUrl}`);
  
    const prompt = uiTestPrompt(pageUrl, pageDescription);
  
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });
  
    const rawContent = response.choices[0].message.content ?? "";
  
    const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No JSON array found in response");
    }
  
    const testCases = JSON.parse(jsonMatch[0]);
  
    const outputPath = path.join(__dirname, "..", "output", "ui-testcases.json");
    fs.writeFileSync(outputPath, JSON.stringify(testCases, null, 2));
  
    console.log(`✅ UI Test cases saved to output/ui-testcases.json`);
  }
  
  async function main(): Promise<void> {
    await generateAPITests(
      "https://petstore.swagger.io/v2/pet",
      "POST",
      "Add a new pet to the store"
    );
  
    await generateUITests(
      "https://www.automationexercise.com/login",
      "Login page with email and password fields"
    );
  }
  
  main();