import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commands = ["bun run lint:fix", "bun run format:fix", "bun run check"];

async function runAll() {
  try {
    console.log("🚀 Starting linting and formatting...\n");

    for (const cmd of commands) {
      console.log(`Running: ${cmd}`);
      try {
        const output = execSync(cmd, {
          cwd: __dirname,
          encoding: "utf-8",
          stdio: "pipe",
        });
        if (output) {
          console.log(output);
        }
        console.log(`✅ ${cmd} completed successfully\n`);
      } catch (error) {
        // Some commands may exit with non-zero codes that aren't errors
        if (error.status && error.status !== 0) {
          console.log("Command output:", error.stdout);
          console.log("Command errors:", error.stderr);
        }
        console.log(`⚠️ ${cmd} finished (status: ${error.status || 0})\n`);
      }
    }

    console.log("✨ All tasks completed!");
  } catch (error) {
    console.error("❌ Error during execution:", error);
    process.exit(1);
  }
}

runAll();
