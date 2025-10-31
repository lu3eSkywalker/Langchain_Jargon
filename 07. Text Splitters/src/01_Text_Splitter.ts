import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const text = `Ethereum is a decentralized platform that enables developers to build 
    and deploy smart contracts and decentralized applications (DApps) on a 
    blockchain. Unlike Bitcoin, which is primarily a digital currency, 
    Ethereum’s blockchain is more flexible, offering a Turing-complete 
    programming language that allows developers to write complex, 
    self-executing contracts without needing a trusted intermediary. 
    Smart contracts on Ethereum are transparent, autonomous, and immutable, 
    meaning they automatically enforce their terms once deployed. The 
    Ethereum network is powered by Ether (ETH), which is used to pay for 
    transaction fees and computational services, with Gas serving as a 
    measure of computational work done by each operation. To secure the 
    network, Ethereum originally employed Proof of Work (PoW), but transitioned 
    to Proof of Stake (PoS) to improve scalability and energy efficiency. 
    The system is designed to be permissionless, allowing anyone to participate 
    without approval from a central authority. Ethereum aims to offer a world 
    computer, where all applications run identically across the globe, without 
    any downtime or censorship. The platform’s decentralized nature ensures that 
    no single entity can control or manipulate the data.`;
    
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0,
});

async function main() {
    const output = await splitter.createDocuments([text]);

    console.log(output);
}

main();