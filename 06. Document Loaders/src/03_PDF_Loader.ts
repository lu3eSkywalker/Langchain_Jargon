import fs from "fs/promises";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";

dotenv.config();

const pdfDoc = "src/files/bitcoin.pdf";

async function main() {
    const buffer = await fs.readFile(pdfDoc);
    const pdfBlob = new Blob([buffer], { type: "application/pdf" });
    const loader = new WebPDFLoader(pdfBlob, {});

    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const docs = await loader.load();

    const promptTemplate = PromptTemplate.fromTemplate(
        "Summarize this csv doc {csv}"
    );

    const prompt = await promptTemplate.format({ csv: docs });

    const result = await model.invoke(prompt)

    console.log(result.content)
}

main();