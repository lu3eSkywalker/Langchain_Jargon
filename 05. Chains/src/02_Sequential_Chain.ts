import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import dotenv from "dotenv";
import { RunnableLambda } from "@langchain/core/runnables";

dotenv.config();

async function main() {
    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const parser = new StringOutputParser();

    const promptTemplate1 = ChatPromptTemplate.fromMessages(
        [
            ["system", "You are a helpful web3 expert"],
            ["human", "Explain in simple terms, what is {topic}"]
        ]
    );

    const promptTemplate2 = ChatPromptTemplate.fromMessages(
        [
        ["system", "You are a summarizer."],
        ["human", "Summarize the following text:\n\n{text}"]
        ]
    );

    const explainChain = promptTemplate1.pipe(llm).pipe(parser);

    const toSummaryInput = new RunnableLambda({
        func: (text: string) => ({ text })
    });

    const summaryChain = explainChain.pipe(toSummaryInput).pipe(promptTemplate2).pipe(llm).pipe(parser);

    const result = await summaryChain.invoke({ topic: "Ethereum" });

    console.log(result);
}

main()