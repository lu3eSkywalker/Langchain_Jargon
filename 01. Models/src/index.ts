import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const result = await llm.invoke("Explain Ethereum in an easy way");

    console.log(result);
}

main()