"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const dotenv = __importStar(require("dotenv"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv.config({ path: "../.env", quiet: true });
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const server = new mcp_js_1.McpServer({
    name: "testpilot.ai",
    version: "1.0.0",
});
server.tool("generate_tests", "Generate test cases using AI for a given URl or Api end points", {
    url: zod_1.z.string().describe("The URL or API endpoint to generate tests for"),
    type: zod_1.z.enum(["ui", "api"]).describe("Type of tests to generate"),
}, async ({ url, type }) => {
    const scriptPath = path.join(__dirname, "../../ai-engine/src/testGenerator.ts");
    const { stdout, stderr } = await execAsync(`npx ts-node ${scriptPath} ${type} ${url}`);
    return {
        content: [{ type: "text", text: stdout || stderr }],
    };
});
server.tool("run_ui_tests", "Run Playwright UI tests", {
    testFile: zod_1.z.string().optional().describe("Specific test file to run, leave empty to run all tests"),
}, async ({ testFile }) => {
    const webTestsPath = path.join(__dirname, "../../web-tests");
    const command = testFile
        ? `npx playwright test ${testFile}`
        : `npx playwright test`;
    try {
        const { stdout, stderr } = await execAsync(command, { cwd: webTestsPath });
        return {
            content: [{ type: "text", text: stdout || stderr }],
        };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: error.stdout || error.message }],
        };
    }
});
server.tool("run_api_tests", "Run RestAssured API tests", {
    testClass: zod_1.z.string().optional().describe("Specific test class to run, leave empty to run all tests"),
}, async ({ testClass }) => {
    const apiTestsPath = path.join(__dirname, "../../api-tests");
    const command = testClass
        ? `mvn test -Dtest=${testClass}`
        : `mvn test`;
    try {
        const { stdout, stderr } = await execAsync(command, { cwd: apiTestsPath });
        return {
            content: [{ type: "text", text: stdout || stderr }],
        };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: error.stdout || error.message }],
        };
    }
});
server.tool("get_test_results", "Get the latest test results", {
    type: zod_1.z.enum(["ui", "api"]).describe("Type of test results to retrieve"),
}, async ({ type }) => {
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
        }
        else {
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
    }
    catch (error) {
        return {
            content: [{ type: "text", text: error.message }],
        };
    }
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("TestPilot AI MCP Server is running... ");
}
main().catch(console.error);
