import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";

dotenv.config();

const exampleCsvPath =
    "src/files/bitcoin_prices_example.csv";

const loader = new CSVLoader(exampleCsvPath);

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const docs = await loader.load();

    const promptTemplate = PromptTemplate.fromTemplate(
        "Summarize this pdf doc {pdf}"
    );

    const prompt = await promptTemplate.format({ pdf: docs });

    const result = await model.invoke(prompt)

    console.log(result.content)
}
main()