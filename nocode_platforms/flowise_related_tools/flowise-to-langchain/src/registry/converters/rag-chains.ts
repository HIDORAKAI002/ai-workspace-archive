/**
 * RAG Chain Converters
 *
 * Converts Flowise RAG (Retrieval Augmented Generation) nodes into LangChain RAG implementations
 */

import { BaseConverter } from '../registry.js';
import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';

/**
 * Advanced RAG Chain Converter
 * Enhanced RAG with custom retrieval and generation strategies
 */
export class AdvancedRAGChainConverter extends BaseConverter {
  readonly flowiseType = 'advancedRAGChain';
  readonly category = 'rag';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'advanced_rag');
    const retrievalStrategy = this.getParameterValue(
      node,
      'retrievalStrategy',
      'similarity'
    );
    const k = this.getParameterValue(node, 'k', 4);
    const scoreThreshold = this.getParameterValue(node, 'scoreThreshold', 0.5);
    const rerankStrategy = this.getParameterValue(
      node,
      'rerankStrategy',
      'none'
    );
    const verbose = this.getParameterValue(node, 'verbose', false);

    const imports = this.generateImport('@langchain/core/runnables', [
      'RunnablePassthrough',
      'RunnableSequence',
    ]);

    const implementation = `const ${variableName} = RunnableSequence.from([
  {
    context: async (input: { question: string }) => {
      // Advanced retrieval with ${retrievalStrategy} strategy
      const retriever = vectorStore.asRetriever({
        searchType: ${this.formatParameterValue(retrievalStrategy)},
        searchKwargs: { 
          k: ${k},
          scoreThreshold: ${scoreThreshold}
        }
      });
      
      const docs = await retriever.getRelevantDocuments(input.question);
      
      ${
        rerankStrategy !== 'none'
          ? `
      // Rerank documents using ${rerankStrategy} strategy
      const rerankedDocs = await rerankDocuments(docs, input.question, '${rerankStrategy}');
      return rerankedDocs.map(doc => doc.pageContent).join('\\n\\n');
      `
          : `
      return docs.map(doc => doc.pageContent).join('\\n\\n');
      `
      }
    },
    question: (input: { question: string }) => input.question,
  },
  {
    answer: async (input: { context: string; question: string }) => {
      const prompt = \`Context: \${input.context}

Question: \${input.question}

Answer based on the context above:\`;
      
      const response = await llm.call(prompt);
      
      ${
        verbose
          ? `
      console.log('RAG Context:', input.context);
      console.log('RAG Question:', input.question);
      console.log('RAG Answer:', response);
      `
          : ''
      }
      
      return response;
    }
  }
]);

${
  rerankStrategy !== 'none'
    ? `
// Reranking function
async function rerankDocuments(docs: any[], query: string, strategy: string) {
  switch (strategy) {
    case 'cohere':
      // Cohere reranking implementation
      const { CohereRerank } = await import('@langchain/cohere');
      const cohereRerank = new CohereRerank({
        apiKey: process.env.COHERE_API_KEY || '',
        model: 'rerank-english-v2.0',
        topN: docs.length,
      });
      
      const rerankedDocs = await cohereRerank.rerank(docs, query);
      return rerankedDocs.map((result: any) => ({
        ...docs[result.index],
        relevanceScore: result.relevance_score,
      }));
    case 'sentence_transformers':
      // Sentence transformers reranking implementation
      const { HuggingFaceTransformersEmbeddings } = await import('@langchain/community/embeddings/hf_transformers');
      const embeddings = new HuggingFaceTransformersEmbeddings({
        modelName: 'sentence-transformers/all-MiniLM-L6-v2',
      });
      
      // Generate embeddings for query and documents
      const queryEmbedding = await embeddings.embedQuery(query);
      const docEmbeddings = await Promise.all(
        docs.map(doc => embeddings.embedQuery(doc.pageContent))
      );
      
      // Calculate cosine similarity scores
      const scores = docEmbeddings.map(docEmb => {
        const dotProduct = queryEmbedding.reduce((sum, val, i) => sum + val * docEmb[i], 0);
        const queryNorm = Math.sqrt(queryEmbedding.reduce((sum, val) => sum + val * val, 0));
        const docNorm = Math.sqrt(docEmb.reduce((sum, val) => sum + val * val, 0));
        return dotProduct / (queryNorm * docNorm);
      });
      
      // Sort documents by similarity score
      const rankedDocs = docs
        .map((doc, index) => ({ doc, score: scores[index] }))
        .sort((a, b) => b.score - a.score)
        .map(({ doc, score }) => ({ ...doc, relevanceScore: score }));
      
      return rankedDocs;
    default:
      return docs;
  }
}
`
    : ''
}`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/core'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }
}

/**
 * Multi-Vector RAG Chain Converter
 * RAG with multiple vector stores for different content types
 */
export class MultiVectorRAGChainConverter extends BaseConverter {
  readonly flowiseType = 'multiVectorRAGChain';
  readonly category = 'rag';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'multi_vector_rag');
    const vectorStores = this.getParameterValue(node, 'vectorStores', [
      'primary',
      'secondary',
    ]);
    const weights = this.getParameterValue(node, 'weights', [0.7, 0.3]);
    const k = this.getParameterValue(node, 'k', 4);

    const imports = this.generateImport('@langchain/core/runnables', [
      'RunnablePassthrough',
      'RunnableSequence',
    ]);

    const implementation = `const ${variableName} = RunnableSequence.from([
  {
    context: async (input: { question: string }) => {
      // Retrieve from multiple vector stores
      const allResults = await Promise.all([
        ${(vectorStores || [])
          .map(
            (store: string, index: number) => `
        ${store}VectorStore.asRetriever({ k: ${Math.ceil((k || 4) * ((weights || [])[index] || 1))} })
          .getRelevantDocuments(input.question)
          .then(docs => docs.map(doc => ({ ...doc, source: '${store}', weight: ${(weights || [])[index] || 1} })))
        `
          )
          .join(',')}
      ]);
      
      // Combine and weight results
      const combinedResults = allResults.flat();
      
      // Sort by relevance score * weight
      const sortedResults = combinedResults
        .sort((a, b) => (b.metadata.score * b.weight) - (a.metadata.score * a.weight))
        .slice(0, ${k});
      
      return sortedResults.map(doc => 
        \`[Source: \${doc.source}] \${doc.pageContent}\`
      ).join('\\n\\n');
    },
    question: (input: { question: string }) => input.question,
  },
  {
    answer: async (input: { context: string; question: string }) => {
      const prompt = \`Multiple sources context:
\${input.context}

Question: \${input.question}

Provide a comprehensive answer based on the context from multiple sources:\`;
      
      return await llm.call(prompt);
    }
  }
]);`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/core'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }
}

/**
 * Conversational RAG Chain Converter
 * RAG with conversation history and follow-up questions
 */
export class ConversationalRAGChainConverter extends BaseConverter {
  readonly flowiseType = 'conversationalRAGChain';
  readonly category = 'rag';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'conversational_rag');
    const memoryKey = this.getParameterValue(node, 'memoryKey', 'chat_history');
    const k = this.getParameterValue(node, 'k', 4);
    const returnSourceDocuments = this.getParameterValue(
      node,
      'returnSourceDocuments',
      true
    );

    const imports = this.generateImport('langchain/chains', [
      'ConversationalRetrievalQAChain',
    ]);

    const implementation = `const ${variableName} = ConversationalRetrievalQAChain.fromLLM(
  llm,
  vectorStore.asRetriever({ k: ${k} }),
  {
    memory: new BufferMemory({
      memoryKey: ${this.formatParameterValue(memoryKey)},
      returnMessages: true,
      outputKey: 'answer',
      inputKey: 'question',
    }),
    returnSourceDocuments: ${returnSourceDocuments},
    verbose: true,
    questionGeneratorChainOptions: {
      template: \`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}

Follow Up Input: {question}

Standalone question:\`
    },
    qaChainOptions: {
      type: 'stuff',
      prompt: \`Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Question: {question}

Answer:\`
    }
  }
);

// Enhanced conversation handling
const enhancedConversationalRAG = {
  async call(input: { question: string; chat_history?: string[] }) {
    const result = await ${variableName}.call(input);
    
    // Add conversation context to response
    return {
      answer: result.answer,
      sourceDocuments: result.sourceDocuments,
      conversationId: Date.now().toString(),
      followUpQuestions: await generateFollowUpQuestions(result.answer, input.question)
    };
  }
};

async function generateFollowUpQuestions(answer: string, originalQuestion: string) {
  const prompt = \`Based on this Q&A exchange, suggest 3 relevant follow-up questions:

Original Question: \${originalQuestion}
Answer: \${answer}

Follow-up questions:\`;
  
  const response = await llm.call(prompt);
  return response.split('\\n').filter(q => q.trim()).slice(0, 3);
}`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['langchain/chains', 'langchain/memory'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['langchain/chains', 'langchain/memory'];
  }
}

/**
 * Graph RAG Chain Converter
 * RAG with knowledge graph integration
 */
export class GraphRAGChainConverter extends BaseConverter {
  readonly flowiseType = 'graphRAGChain';
  readonly category = 'rag';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'graph_rag');
    const graphDatabase = this.getParameterValue(
      node,
      'graphDatabase',
      'neo4j'
    );
    const maxHops = this.getParameterValue(node, 'maxHops', 2);
    const entityExtraction = this.getParameterValue(
      node,
      'entityExtraction',
      true
    );

    const imports = this.generateImport('@langchain/core/runnables', [
      'RunnableSequence',
    ]);

    const implementation = `const ${variableName} = RunnableSequence.from([
  {
    entities: async (input: { question: string }) => {
      ${
        entityExtraction
          ? `
      // Extract entities from the question
      const entityPrompt = \`Extract named entities from this question:
Question: \${input.question}

Entities (person, organization, location, concept):\`;
      
      const entitiesResponse = await llm.call(entityPrompt);
      return entitiesResponse.split(',').map(e => e.trim()).filter(e => e);
      `
          : `
      return [];
      `
      }
    },
    question: (input: { question: string }) => input.question,
  },
  {
    graphContext: async (input: { entities: string[]; question: string }) => {
      // Query knowledge graph for relevant information
      const graphQuery = \`
        MATCH (n)
        WHERE n.name IN [\${input.entities.map(e => \`"\${e}"\`).join(', ')}]
        MATCH (n)-[r*1..${maxHops}]-(related)
        RETURN n.name, type(r), related.name, related.description
        LIMIT 50
      \`;
      
      // Execute graph query with specific database integration
      const graphResults = await executeGraphQuery(graphQuery, '${graphDatabase}');
      
      return graphResults.map(result => 
        \`\${result.name} -[\${result.relationship}]-> \${result.related}: \${result.description}\`
      ).join('\\n');
    },
    vectorContext: async (input: { question: string }) => {
      // Traditional vector retrieval
      const retriever = vectorStore.asRetriever({ k: 4 });
      const docs = await retriever.getRelevantDocuments(input.question);
      return docs.map(doc => doc.pageContent).join('\\n\\n');
    }
  },
  {
    answer: async (input: { graphContext: string; vectorContext: string; question: string }) => {
      const prompt = \`You have access to both structured knowledge graph information and unstructured document context.

Knowledge Graph Context:
\${input.graphContext}

Document Context:
\${input.vectorContext}

Question: \${input.question}

Provide a comprehensive answer using both sources of information:\`;
      
      return await llm.call(prompt);
    }
  }
]);

async function executeGraphQuery(query: string, graphDatabase: string) {
  // Graph database integration implementation
  
  switch (graphDatabase) {
    case 'neo4j': {
      const { Neo4jGraph } = await import('@langchain/community/graphs/neo4j_graph');
      const graph = await Neo4jGraph.initialize({
        url: process.env.NEO4J_URL || 'bolt://localhost:7687',
        username: process.env.NEO4J_USERNAME || 'neo4j',
        password: process.env.NEO4J_PASSWORD || '',
      });
      
      const result = await graph.query(query);
      return result.map((row: any) => ({
        name: row.n?.name || '',
        relationship: row.r?.type || '',
        related: row.related?.name || '',
        description: row.related?.description || '',
      }));
    }
    
    case 'arangodb': {
      const { ArangoGraph } = await import('@langchain/community/graphs/arango_graph');
      const graph = new ArangoGraph({
        url: process.env.ARANGO_URL || 'http://localhost:8529',
        databaseName: process.env.ARANGO_DATABASE || '_system',
        username: process.env.ARANGO_USERNAME || 'root',
        password: process.env.ARANGO_PASSWORD || '',
      });
      
      const result = await graph.query(query);
      return result.map((row: any) => ({
        name: row.name || '',
        relationship: row.relationship || '',
        related: row.relatedName || '',
        description: row.description || '',
      }));
    }
    
    case 'neptune': {
      // Amazon Neptune integration
      const { NeptuneGraph } = await import('@langchain/community/graphs/neptune_graph');
      const graph = new NeptuneGraph({
        endpoint: process.env.NEPTUNE_ENDPOINT || '',
        port: parseInt(process.env.NEPTUNE_PORT || '8182'),
        region: process.env.AWS_REGION || 'us-east-1',
      });
      
      const result = await graph.query(query);
      return result.map((row: any) => ({
        name: row.name || '',
        relationship: row.edgeLabel || '',
        related: row.relatedName || '',
        description: row.properties?.description || '',
      }));
    }
    
    default:
      console.warn(\`Graph database '\${graphDatabase}' not implemented, returning empty results\`);
      return [];
  }
}`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/core'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }
}

/**
 * Adaptive RAG Chain Converter
 * RAG that adapts retrieval strategy based on query type
 */
export class AdaptiveRAGChainConverter extends BaseConverter {
  readonly flowiseType = 'adaptiveRAGChain';
  readonly category = 'rag';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'adaptive_rag');
    // Query classification for adaptive RAG
    // const queryClassifier = this.getParameterValue(
    //   node,
    //   'queryClassifier',
    //   'llm'
    // );
    // const strategies = this.getParameterValue(node, 'strategies', [
    //   'factual',
    //   'analytical',
    //   'creative',
    // ]);

    const imports = this.generateImport('@langchain/core/runnables', [
      'RunnableSequence',
      'RunnableBranch',
    ]);

    const implementation = `const ${variableName} = RunnableSequence.from([
  {
    queryType: async (input: { question: string }) => {
      // Classify query type
      const classificationPrompt = \`Classify this query into one of these categories:
- factual: Asking for specific facts or information
- analytical: Requiring analysis or reasoning
- creative: Requiring creative thinking or generation

Query: \${input.question}

Category:\`;
      
      const classification = await llm.call(classificationPrompt);
      return classification.toLowerCase().trim();
    },
    question: (input: { question: string }) => input.question,
  },
  RunnableBranch.from([
    [
      (input: { queryType: string }) => input.queryType === 'factual',
      {
        context: async (input: { question: string }) => {
          // High-precision retrieval for factual queries
          const retriever = vectorStore.asRetriever({
            searchType: 'similarity',
            searchKwargs: { k: 3, scoreThreshold: 0.8 }
          });
          const docs = await retriever.getRelevantDocuments(input.question);
          return docs.map(doc => doc.pageContent).join('\\n\\n');
        }
      }
    ],
    [
      (input: { queryType: string }) => input.queryType === 'analytical',
      {
        context: async (input: { question: string }) => {
          // Broader retrieval for analytical queries
          const retriever = vectorStore.asRetriever({
            searchType: 'mmr',
            searchKwargs: { k: 6, fetchK: 20 }
          });
          const docs = await retriever.getRelevantDocuments(input.question);
          return docs.map(doc => doc.pageContent).join('\\n\\n');
        }
      }
    ],
    [
      (input: { queryType: string }) => input.queryType === 'creative',
      {
        context: async (input: { question: string }) => {
          // Diverse retrieval for creative queries
          const retriever = vectorStore.asRetriever({
            searchType: 'mmr',
            searchKwargs: { k: 8, fetchK: 30, lambdaMult: 0.25 }
          });
          const docs = await retriever.getRelevantDocuments(input.question);
          return docs.map(doc => doc.pageContent).join('\\n\\n');
        }
      }
    ]
  ]),
  {
    answer: async (input: { context: string; question: string; queryType: string }) => {
      const promptTemplates = {
        factual: \`Context: \${input.context}

Question: \${input.question}

Provide a precise, factual answer based on the context:\`,
        analytical: \`Context: \${input.context}

Question: \${input.question}

Analyze the information and provide a reasoned response:\`,
        creative: \`Context: \${input.context}

Question: \${input.question}

Use the context as inspiration to provide a creative response:\`
      };
      
      const prompt = promptTemplates[input.queryType as keyof typeof promptTemplates] || promptTemplates.factual;
      return await llm.call(prompt);
    }
  }
]);`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/core'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }
}
