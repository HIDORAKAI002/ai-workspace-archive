/**
 * Sample documents for the retrieval system
 */
export type Document = {
  title: string;
  content: string;
  source: string;
};

export const documents: Document[] = [
  {
    title: "VoltAgent Introduction",
    source: "Documentation",
    content: `
      VoltAgent is a powerful framework for building AI-powered agents that can interact with users and tools.
      It provides a simple yet flexible way to create agents that can understand natural language and perform actions based on user requests.
      You can integrate various tools and capabilities into your agents, such as retrieving information, performing calculations, and interacting with external APIs.
    `,
  },
  {
    title: "Agent Architecture",
    source: "Technical Guide",
    content: `
      Agents in VoltAgent are composed of several components:
      1. A Large Language Model (LLM) that powers the agent's understanding and reasoning capabilities.
      2. Tools that extend the agent's abilities to interact with external systems.
      3. Memory to maintain context across conversations.
      4. A controller that manages the flow of information between components.
      
      The agent processes user input, decides on the appropriate actions to take, executes those actions, and generates responses based on the results.
    `,
  },
  {
    title: "Retrieval Augmented Generation (RAG)",
    source: "Best Practices",
    content: `
      Retrieval Augmented Generation (RAG) is a technique that enhances language models with external knowledge.
      It works by retrieving relevant information from a knowledge base and providing it to the model as additional context.
      This approach helps the model generate more accurate and relevant responses, especially for domain-specific queries.
      
      RAG in VoltAgent is implemented through the retrieval tool, which searches a vector database of documents and returns the most relevant information to the agent.
    `,
  },
  {
    title: "Vector Embeddings",
    source: "Technical Guide",
    content: `
      Vector embeddings are numerical representations of text that capture semantic meaning.
      When working with document retrieval, we convert text chunks into embedding vectors and store them in a vector database.
      During retrieval, we convert the query into an embedding vector and find the most similar vectors in the database.
      
      VoltAgent's retrieval system uses OpenAI's embedding model to create these vector representations, and FAISS for efficient similarity search.
    `,
  },
];
