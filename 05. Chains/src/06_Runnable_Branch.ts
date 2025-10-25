import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableBranch, RunnableSequence } from "@langchain/core/runnables";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: process.env.GOOGLE_API_KEY,
});

const classificationPrompt = ChatPromptTemplate.fromTemplate(`
    Given the user feedback below, classify it as either being about \`positive\`, \`negative\`, or \`Other\`.

    Do not respond with more than one word.

    <feedback>
    {feedback}
    </feedback>

    Classification:
    `);

const classificationChain = RunnableSequence.from([
    classificationPrompt,
    model,
    new StringOutputParser(),
]);

const posChain = ChatPromptTemplate.fromTemplate(
    "Write an appropriate response to this positive feedback \n {feedback}"
).pipe(model);

const negChain = ChatPromptTemplate.fromTemplate(
    "Write an appropriate response to this negative feedback \n {feedback}"
).pipe(model);

const genChain = ChatPromptTemplate.fromTemplate(
    "Write an appropriate response to this feedback \n {feedback}"
).pipe(model);

const branch = RunnableBranch.from([
    [
        (x: { feedback: string }) =>
            x.feedback.toLowerCase().includes("positive"),
        posChain,
    ],
    [
        (x: { feedback: string }) =>
            x.feedback.toLowerCase().includes("negative"),
        negChain,
    ],
    genChain,
]);

const fullChain = RunnableSequence.from([
    {
        topic: classificationChain,
        feedback: (input: { feedback: string }) => input.feedback,
    },
    branch,
]);

async function main() {
    const result1 = await fullChain.invoke({ feedback: reviewText})
    console.log(result1);
}

const reviewText = `
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

main()