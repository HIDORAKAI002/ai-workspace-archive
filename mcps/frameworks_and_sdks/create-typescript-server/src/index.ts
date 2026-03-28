#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import ejs from "ejs";
import fs from "fs/promises";
import inquirer from "inquirer";
import ora from "ora";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
function getClaudeConfigDir(): string {
  switch (os.platform()) {
    case "darwin":
      return path.join(
        os.homedir(),
        "Library",
        "Application Support",
        "Claude",
      );
    case "win32":
      if (!process.env.APPDATA) {
        throw new Error("APPDATA environment variable is not set");
      }
      return path.join(process.env.APPDATA, "Claude");
    default:
      throw new Error(
        `Unsupported operating system for Claude configuration: ${os.platform()}`,
      );
  }
}

async function updateClaudeConfig(name: string, directory: string) {
  try {
    const configFile = path.join(
      getClaudeConfigDir(),
      "claude_desktop_config.json",
    );

    let config;
    try {
      config = JSON.parse(await fs.readFile(configFile, "utf-8"));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
        throw err;
      }

      // File doesn't exist, create initial config
      config = {};
      await fs.mkdir(path.dirname(configFile), { recursive: true });
    }

    if (!config.mcpServers) {
      config.mcpServers = {};
    }

    if (config.mcpServers[name]) {
      const { replace } = await inquirer.prompt([
        {
          type: "confirm",
          name: "replace",
          message: `An MCP server named "${name}" is already configured for Claude.app. Do you want to replace it?`,
          default: false,
        },
      ]);
      if (!replace) {
        console.log(
          chalk.yellow(
            `Skipped replacing Claude.app config for existing MCP server "${name}"`,
          ),
        );
        return;
      }
    }
    config.mcpServers[name] = {
      command: "node",
      args: [path.resolve(directory, "build", "index.js")],
    };

    await fs.writeFile(configFile, JSON.stringify(config, null, 2));
    console.log(
      chalk.green("✓ Successfully added MCP server to Claude.app configuration"),
    );
  } catch {
    console.log(chalk.yellow("Note: Could not update Claude.app configuration"));
  }
}

async function createServer(directory: string, options: any = {}) {
  // Check if directory already exists
  try {
    await fs.access(directory);
    console.log(chalk.red(`Error: Directory '${directory}' already exists.`));
    process.exit(1);
  } catch (err) {
    // Directory doesn't exist, we can proceed
  }

  const questions = [
    {
      type: "input",
      name: "name",
      message: "What is the name of your MCP server?",
      default: path.basename(directory),
      when: !options.name,
    },
    {
      type: "input",
      name: "description",
      message: "What is the description of your server?",
      default: "A Model Context Protocol server",
      when: !options.description,
    },
    {
      type: "confirm",
      name: "installForClaude",
      message: "Would you like to install this server for Claude.app?",
      default: true,
      when: os.platform() === "darwin" || os.platform() === "win32",
    },
  ];

  const answers = await inquirer.prompt(questions);

  const config = {
    name: options.name || answers.name,
    description: options.description || answers.description,
  };

  const spinner = ora("Creating MCP server...").start();

  try {
    // Create project directory
    await fs.mkdir(directory);

    // Copy template files
    const templateDir = path.join(__dirname, "../template");
    const files = await fs.readdir(templateDir, { recursive: true });

    for (const file of files) {
      const sourcePath = path.join(templateDir, file);
      const stats = await fs.stat(sourcePath);

      if (!stats.isFile()) continue;

      // Special handling for dot files - remove the leading dot from template name
      const targetPath = path.join(
        directory,
        file.startsWith('dotfile-')
          ? `.${file.slice(8).replace('.ejs', '')}`
          : file.replace('.ejs', '')
      );
      const targetDir = path.dirname(targetPath);

      // Create subdirectories if needed
      await fs.mkdir(targetDir, { recursive: true });

      // Read and process template file
      let content = await fs.readFile(sourcePath, "utf-8");

      // Use EJS to render the template
      content = ejs.render(content, config);

      // Write processed file
      await fs.writeFile(targetPath, content);
    }

    spinner.succeed(chalk.green("MCP server created successfully!"));

    if (answers.installForClaude) {
      await updateClaudeConfig(config.name, directory);
    }

    // Print next steps
    console.log("\nNext steps:");
    console.log(chalk.cyan(`  cd ${directory}`));
    console.log(chalk.cyan("  npm install"));
    console.log(
      chalk.cyan(`  npm run build  ${chalk.reset("# or: npm run watch")}`),
    );
    console.log(
      chalk.cyan(
        `  npm link       ${chalk.reset("# optional, to make available globally")}\n`,
      ),
    );
  } catch (error) {
    spinner.fail(chalk.red("Failed to create MCP server"));
    console.error(error);
    process.exit(1);
  }
}

const program = new Command()
  .name("create-mcp-server")
  .description("Create a new MCP server")
  .argument("<directory>", "Directory to create the server in")
  .option("-n, --name <name>", "Name of the server")
  .option("-d, --description <description>", "Description of the server")
  .action(createServer);

program.parse();
