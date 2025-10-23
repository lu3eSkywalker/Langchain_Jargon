import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const embedding = new GoogleGenerativeAIEmbeddings({
        model: "gemini-embedding-001",
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const result = await embedding.embedQuery("Explain Ethereum in an easy way");
    console.log(result);
}

main();