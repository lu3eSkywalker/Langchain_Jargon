import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";

dotenv.config();

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const promptTemplate = ChatPromptTemplate.fromMessages(
        [
            ["system", "You are a helpful {domain} expert"],
            ["human", "Explain in simple terms, what is {topic}"]
        ]
    )

    const prompt = await promptTemplate.format({ domain: "web3", topic: "Ethereum"});

    const result = await model.invoke(prompt)

    console.log(result.content)
}

main()