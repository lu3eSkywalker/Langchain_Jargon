import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";

dotenv.config();

async function main() {
    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const parser = new JsonOutputParser();

    const promptTemplate = ChatPromptTemplate.fromMessages(
        [
            ["system", "You are a helpful {domain} expert. You must respond ONLY in strict JSON format. {format_instructions}"],
            ["human", "Explain in simple terms, what is {topic}"]
        ]
    );

    const chain = promptTemplate.pipe(llm).pipe(parser);

    const result = await chain.invoke({domain: "web3", topic: "Ethereum", format_instructions: parser.getFormatInstructions});

    console.log(result);
}

main()