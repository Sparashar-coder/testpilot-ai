import { McpServer} from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import{ z } from "zod";
import * as dotenv from "dotenv"
import { exec } from "child_process"
import { promisify } from "util"
import * as fs from "fs"
import * as path from "path";

dotenv.config({ path: "../.env", quiet: true } as any);

const execAsync = promisify(exec);


const server = new McpServer({
name : "testpilot.ai",
version:"1.0.0",

});

server.tool(
"generate_tests",
"Generate test cases using AI for a given URl or Api end points",

{

    url: z.string().describe("The URL or API endpoint to generate tests for"),
    type: z.enum(["ui", "api"]).describe("Type of tests to generate"),
},


async ({ url, type }) => {
    const scriptPath = path.join(__dirname, "../../ai-engine/src/testGenerator.ts");
    const { stdout, stderr } = await execAsync(
      `npx ts-node ${scriptPath} ${type} ${url}`
    );
    return {
      content: [{ type: "text", text: stdout || stderr }],
    };
  }


);

server.tool(
    "run_ui_tests",
    "Run Playwright UI tests",
    {
      testFile: z.string().optional().describe("Specific test file to run, leave empty to run all tests"),
    },
    async ({ testFile }) => {
      const webTestsPath = path.join(__dirname, "../../web-tests");
      const command = testFile
        ? `npx playwright test ${testFile}`
        : `npx playwright test`;
  
      try {
        const { stdout, stderr } = await execAsync(command, { cwd: webTestsPath });
        return {
          content: [{ type: "text", text: stdout || stderr }],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: error.stdout || error.message }],
        };
      }
    }
  );

  server.tool(
    "run_api_tests",
    "Run RestAssured API tests",
    {
      testClass: z.string().optional().describe("Specific test class to run, leave empty to run all tests"),
    },
    async ({ testClass }) => {
      const apiTestsPath = path.join(__dirname, "../../api-tests");
      const command = testClass
        ? `mvn test -Dtest=${testClass}`
        : `mvn test`;
  
      try {
        const { stdout, stderr } = await execAsync(command, { cwd: apiTestsPath });
        return {
          content: [{ type: "text", text: stdout || stderr }],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: error.stdout || error.message }],
        };
      }
    }
  );

  server.tool(
    "get_test_results",
    "Get the latest test results",
    {
      type: z.enum(["ui", "api"]).describe("Type of test results to retrieve"),
    },
    async ({ type }) => {
      try {
        if (type === "ui") {
          const resultsPath = path.join(__dirname, "../../web-tests/playwright-report/index.html");
          const exists = fs.existsSync(resultsPath);
          if (!exists) {
            return {
              content: [{ type: "text", text: "No UI test results found. Run UI tests first!" }],
            };
          }
          return {
            content: [{ type: "text", text: `UI test report available at: ${resultsPath}` }],
          };
        } else {
          const resultsPath = path.join(__dirname, "../../api-tests/target/surefire-reports");
          const exists = fs.existsSync(resultsPath);
          if (!exists) {
            return {
              content: [{ type: "text", text: "No API test results found. Run API tests first!" }],
            };
          }
          const files = fs.readdirSync(resultsPath);
          return {
            content: [{ type: "text", text: `API test reports: ${files.join(", ")}` }],
          };
        }
      } catch (error: any) {
        return {
          content: [{ type: "text", text: error.message }],
        };
      }
    }
  );

  async function main(): Promise<void> {
    const transport  = new StdioServerTransport();
    await server.connect(transport);

    console.error("TestPilot AI MCP Server is running... ");
  }
  main().catch(console.error);

