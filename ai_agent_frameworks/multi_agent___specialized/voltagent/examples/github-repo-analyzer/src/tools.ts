import { Octokit } from "@octokit/rest";
import { createTool } from "@voltagent/core";
import { z } from "zod";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Tool to fetch repository stars
export const fetchRepoStarsTool = createTool({
  name: "repo_stars",
  description: "Fetches the number of stars for a GitHub repository",
  parameters: z.object({
    owner: z.string().describe("The owner of the repository"),
    repo: z.string().describe("The name of the repository"),
  }),
  execute: async ({ owner, repo }: { owner: string; repo: string }) => {
    try {
      const response = await octokit.repos.get({
        owner,
        repo,
      });
      return {
        success: true,
        stars: response.data.stargazers_count,
        message: `Repository ${owner}/${repo} has ${response.data.stargazers_count} stars.`,
      };
    } catch (error) {
      return {
        success: false,
        stars: 0,
        message: `Error fetching stars for ${owner}/${repo}: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
});

// Tool to fetch repository contributors
export const fetchRepoContributorsTool = createTool({
  name: "repo_contributors",
  description: "Fetches the list of contributors for a GitHub repository",
  parameters: z.object({
    owner: z.string().describe("The owner of the repository"),
    repo: z.string().describe("The name of the repository"),
  }),
  execute: async ({ owner, repo }: { owner: string; repo: string }) => {
    try {
      const response = await octokit.repos.listContributors({
        owner,
        repo,
      });

      const contributors = response.data.map((contributor) => ({
        login: contributor.login,
        contributions: contributor.contributions,
      }));

      return {
        success: true,
        contributors,
        message: `Repository ${owner}/${repo} has ${contributors.length} contributors.`,
        details: contributors,
      };
    } catch (error) {
      return {
        success: false,
        contributors: [],
        message: `Error fetching contributors for ${owner}/${repo}: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
});
