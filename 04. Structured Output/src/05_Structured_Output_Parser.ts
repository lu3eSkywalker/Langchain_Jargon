import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const review = z.object({
        summary: z.string().describe("A brief summary of the review"),
        sentiment: z.enum(["pos", "neg"]).describe("Return sentiment of the review either 'pos', 'neg' or neutral"),
        pros: z.string().describe("Write down all the pros"),
        cons: z.string().describe("Write down all the cons"),
        name: z.string().describe("Write the name of the reviewer"),
    })

    const parser = StructuredOutputParser.fromZodSchema(review as any);

    const prompt = ChatPromptTemplate.fromMessages([
        ["system",
            "Answer the user query. Wrap the output in `json` tags\n{format_instructions}",
        ],
        ["human", "{query}"],
    ]);

    const reviewPrompt = `
    I recently got into the MadLad NFT collection, and I have to say, it's a unique experience. The artwork is out-of-the-box, with distinct, vibrant, and playful characters that really stand out in the crowded NFT space. The entire collection has a sense of humor and rebellious attitude, which makes it even more enjoyable for collectors and fans alike.

What really caught my eye is the tight-knit community that supports the MadLad brand. There are constant updates, giveaways, and events that make holding a MadLad NFT feel like being part of something bigger. The utility is also solid, with access to exclusive events, merch, and more.

On the downside, the market for NFTs is still volatile, and prices can fluctuate heavily, which can be a risk for new buyers. Some may also feel that the hype around NFTs could fade in the future, but for now, it’s an exciting space to be a part of.

Pros:
- Unique, vibrant artwork that stands out
- Strong and engaging community with exclusive perks
- Great sense of humor and rebellious vibe
- Access to exclusive events and merchandise

Review by Luke Skywalker"
    `;

    const partialedPrompt = await prompt.partial({
        format_instructions: parser.getFormatInstructions(),
    });

    const promptValue = await partialedPrompt.invoke({ query: reviewPrompt, format_instructions: ""});

    console.log(promptValue.toChatMessages());
}

main()