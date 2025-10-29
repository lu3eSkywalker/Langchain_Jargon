import { JSONLoader } from "langchain/document_loaders/fs/json";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";

dotenv.config();

const exampleJSONPath =
    "src/files/bitcoin_prices_example.json";

const loader = new JSONLoader(exampleJSONPath);

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const docs = await loader.load();

    const promptTemplate = PromptTemplate.fromTemplate(
        "Summarize this JSON File {json}"
    );

    const prompt = await promptTemplate.format({ json: docs });

    const result = await model.invoke(prompt)

    console.log(result.content)
}
main()