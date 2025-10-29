import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

import dotenv from "dotenv";

dotenv.config();

const loader = new PuppeteerWebBaseLoader("https://www.web3isgoinggreat.com/", {});

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const docs = await loader.load();

    const promptTemplate = PromptTemplate.fromTemplate(
        "What is this webpage about {webpage}"
    )

    const prompt = await promptTemplate.format({ webpage: docs[0].pageContent});

    const result = await model.invoke(prompt)

    console.log(result.content)
}

main()