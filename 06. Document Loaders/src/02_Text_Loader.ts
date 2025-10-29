import { TextLoader } from "langchain/document_loaders/fs/text";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";

dotenv.config();

const loader = new TextLoader(
    "src/files/text.txt"
);

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const docs = await loader.load();

    const promptTemplate = PromptTemplate.fromTemplate(
        "What is this Text File about {text}"
    );

    const prompt = await promptTemplate.format({ text: docs[0].pageContent });

    const result = await model.invoke(prompt)

    console.log(result.content)
}

main()