import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";

dotenv.config();

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const promptTemplate = PromptTemplate.fromTemplate(
        "Tell me a joke about {topic}"
    )

    const prompt = await promptTemplate.format({ topic: "web3"});

    const result = await model.invoke(prompt)

    console.log(result.content)
}

main()