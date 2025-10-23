import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import dotenv from "dotenv";

dotenv.config();

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const json_schema = {
        title: "Review",
        type: "object",
        properties: {
            summary: {
                type: "string",
                description: "A brief summary of the review",
            },
            sentiment: {
                type: "string",
                enum: ["pos", "neg"],
                description: "Return sentiment of the review either negative, positive or neutral",
            },
            pros: {
                type: "array",
                items: { type: "string" },
                description: "Write down all the pros.",
            },
            cons: {
                type: "array",
                items: { type: "string" },
                description: "Write down all the cons.",
            },
            name: {
                type: "string",
                description: "Write the name of the reviewer.",
            },
        },
        required: ["summary", "sentiment"],
    };


    const structuredData = model.withStructuredOutput(json_schema);

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

    const result = await structuredData.invoke(reviewPrompt);

    console.log(result)
}

main()