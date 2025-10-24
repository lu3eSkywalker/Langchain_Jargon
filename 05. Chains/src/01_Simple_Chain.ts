import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import dotenv from "dotenv";

dotenv.config();

async function main() {
    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const parser = new StringOutputParser();

    const promptTemplate = ChatPromptTemplate.fromMessages(
        [
            ["system", "You are a helpful {domain} expert"],
            ["human", "Explain in simple terms, what is {topic}"]
        ]
    );

    const chain = promptTemplate.pipe(llm).pipe(parser);

    const result = await chain.invoke({domain: "web3", topic: "Ethereum"});

    console.log(result);
}

main()