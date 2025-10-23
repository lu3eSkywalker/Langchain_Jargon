import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";

dotenv.config();

async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const template = `Please explain the Web3 concept or protocol titled {topic} with the following specifications:
Explanation Style: {style_input}  
Explanation Length: {length_input}  

1. Technical Explanation:  
   - Clearly describe the underlying blockchain principles (consensus mechanism, smart contracts, tokenomics, etc.).  
   - If relevant, include code snippets or pseudocode demonstrating smart contract logic, token standards, or transaction flows.  

2. Architecture & Components:  
   - Break down how the system is structured (nodes, wallets, dApps, contracts, bridges, etc.).  
   - Explain data flow between users, blockchain, and off-chain systems if applicable.  

3. Real-world Analogy:  
   - Use intuitive analogies to explain how this Web3 system compares to Web2 or traditional systems.  

4. Mathematical or Cryptographic Aspects:  
   - If applicable, include cryptographic primitives (hash functions, signatures, zero-knowledge proofs, etc.) used in the system.  
   - Simplify the math or crypto using examples or minimal pseudocode.  

If certain information is not available in the topic or documentation, respond with:  
"Insufficient information available" instead of making assumptions.  

Ensure the explanation is accurate, logically structured, and aligned with the provided style and length.
`;

    const promptTemplate = PromptTemplate.fromTemplate(
        template
    )

    const prompt = await promptTemplate.format({ topic: "Solana PDA Accounts", style_input: "Simple", length_input: "Medium", });

    const result = await model.invoke(prompt)

    console.log(result.content)
}

main()