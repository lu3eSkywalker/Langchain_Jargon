import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";

dotenv.config();

const loader = new DirectoryLoader("src/files",
    {
        ".json": (path) => new JSONLoader(path,),
        ".txt": (path) => new TextLoader(path),
        ".csv": (path) => new CSVLoader(path,),
    }
);

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });
    
    const docs = await loader.load();

    const promptTemplate = PromptTemplate.fromTemplate(
        "Summarize this JSON, Text, CSV files {file}"
    );

    const prompt = await promptTemplate.format({ file: docs });

    const result = await model.invoke(prompt);

    console.log(result.content);
}

main()