//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const connect_dbEval: EvalFunction = {
    name: 'connect_db Evaluation',
    description: 'Evaluates the MySQL database connectivity using the connect_db tool',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please connect to the MySQL database with host '127.0.0.1', user 'admin', password 'secret', database 'employees', and port '3306' using the connect_db tool. Verify a successful connection.");
        return JSON.parse(result);
    }
};

const queryEval: EvalFunction = {
    name: 'query Tool Evaluation',
    description: 'Evaluates the capability to execute a SELECT query',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Use the 'query' tool to execute the SQL: SELECT name, email FROM users WHERE status = 'active' LIMIT 5. Provide the results.");
        return JSON.parse(result);
    }
};

const executeEval: EvalFunction = {
    name: 'execute Tool Evaluation',
    description: 'Evaluates the correctness and completeness of an INSERT, UPDATE, or DELETE query execution',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please use the 'execute' tool to insert a new record into the 'users' table with name 'John Doe' and age 42. Provide the final SQL statement and the execution result.");
        return JSON.parse(result);
    }
};

const list_tablesEval: EvalFunction = {
    name: 'list_tables Tool Evaluation',
    description: 'Evaluates the tool that lists all tables in the database',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Can you list all tables in the database?");
        return JSON.parse(result);
    }
};

const describe_tableEval: EvalFunction = {
    name: 'describe_table Tool Evaluation',
    description: 'Evaluates the ability to retrieve table structure details',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Describe the structure of the 'users' table in my database, including columns, data types, constraints, and any indexes.");
        return JSON.parse(result);
    }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [connect_dbEval, queryEval, executeEval, list_tablesEval, describe_tableEval]
};
  
export default config;
  
export const evals = [connect_dbEval, queryEval, executeEval, list_tablesEval, describe_tableEval];