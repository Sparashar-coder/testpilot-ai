# 🚀 TestPilot AI

> An AI-powered Test Automation Framework that automatically generates, executes, and reports test cases using Large Language Models, Playwright, RestAssured, and MCP Server.

[![CI Pipeline](https://github.com/Sparashar-coder/testpilot-ai/actions/workflows/testpilot-ci.yml/badge.svg)](https://github.com/Sparashar-coder/testpilot-ai/actions)

---

## 🌟 What Makes This Project Unique

TestPilot AI combines traditional test automation with artificial intelligence:

- 🤖 **AI generates test cases** from any URL or API endpoint automatically
- 🎭 **Playwright executes UI tests** across Chrome, Firefox, and Safari
- ☕ **RestAssured executes API tests** with full CRUD coverage
- 🔗 **MCP Server connects AI to your test suite** — just ask Claude to run your tests
- 🔄 **GitHub Actions runs everything automatically** on every push

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| AI Engine | Groq API (LLaMA 3.3) |
| UI Testing | Playwright + TypeScript |
| API Testing | RestAssured + Java + TestNG |
| AI Agent | MCP Server (Model Context Protocol) |
| CI/CD | GitHub Actions |
| Reporting | Allure Reports + Playwright HTML Report |
| Data Driven | Excel → JSON (xlsx) |
| Build Tool | Maven |

---

## 📁 Project Structure

```
testpilot-ai/
├── ai-engine/                  # AI Test Case Generator
│   ├── prompts/                # Prompt templates for AI
│   │   ├── apiTestPrompt.ts
│   │   └── uiTestPrompt.ts
│   ├── src/
│   │   └── testGenerator.ts    # Core AI generation logic
│   └── output/                 # Generated test cases (JSON)
│       ├── api-testcases.json
│       └── ui-testcases.json
│
├── web-tests/                  # Playwright UI Tests
│   ├── pages/                  # Page Object Model
│   │   ├── LoginPage.ts
│   │   └── HomePage.ts
│   ├── tests/
│   │   └── login.spec.ts       # Login test suite
│   ├── test-data/              # Data Driven Testing
│   │   ├── users.xlsx          # Source test data
│   │   └── users.json          # Generated test data
│   └── utils/
│       └── excelToJson.ts      # Excel to JSON converter
│
├── api-tests/                  # RestAssured API Tests
│   └── src/test/java/com/testpilot/
│       ├── base/
│       │   └── BaseTest.java   # Base configuration
│       ├── tests/
│       │   ├── UserTests.java  # CRUD test suite
│       │   └── DataDrivenTest.java  # DDT test suite
│       └── resources/
│           └── testdata.json   # API test data
│
├── mcp-server/                 # MCP Server (AI Agent)
│   └── src/
│       └── index.ts            # MCP tools definition
│
└── .github/
    └── workflows/
        └── testpilot-ci.yml    # CI/CD Pipeline
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- Maven 3.9+
- Groq API Key (free at [console.groq.com](https://console.groq.com))

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Sparashar-coder/testpilot-ai.git
cd testpilot-ai
```

#### 2. Set up environment variables
Create a `.env` file in the root folder:
```
GROQ_API_KEY=your_groq_api_key_here
```

#### 3. Install AI Engine dependencies
```bash
cd ai-engine
npm install
```

#### 4. Install UI Test dependencies
```bash
cd web-tests
npm install
npx playwright install
```

#### 5. Install API Test dependencies
```bash
cd api-tests
mvn clean install -DskipTests
```

---

## 🤖 AI Test Case Generation

Generate test cases automatically using AI:

```bash
cd ai-engine
npx ts-node src/testGenerator.ts
```

This generates:
- `output/ui-testcases.json` — UI test cases for AutomationExercise.com
- `output/api-testcases.json` — API test cases for JSONPlaceholder API

---

## 🎭 Running UI Tests

```bash
cd web-tests

# Run all tests
npx playwright test

# Run specific test file
npx playwright test login.spec.ts

# Run with UI mode
npx playwright test --ui
```

### Test Coverage:
| Test | Browsers | Type |
|---|---|---|
| Valid Login | Chrome, Firefox, Safari | Positive |
| Invalid Login | Chrome, Firefox, Safari | Negative |
| Empty Fields | Chrome, Firefox, Safari | Edge Case |
| SQL Injection | Chrome, Firefox, Safari | Security |
| XSS Attack | Chrome, Firefox, Safari | Security |

---

## ☕ Running API Tests

```bash
cd api-tests

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserTests
mvn test -Dtest=DataDrivenTest
```

### Test Coverage:
| Test | Method | Endpoint |
|---|---|---|
| Get All Users | GET | /users |
| Get Single User | GET | /users/1 |
| Create User | POST | /users |
| Update User | PUT | /users/1 |
| Delete User | DELETE | /users/1 |
| Data Driven (3 sets) | POST | /users |

---

## 🔗 MCP Server (AI Agent)

TestPilot AI includes an MCP Server that connects Claude AI to your test suite.

### Setup
```bash
cd mcp-server
npm install
npm run build
```

### Configure Claude Desktop
Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "testpilot-ai": {
      "command": "node",
      "args": ["path/to/testpilot-ai/mcp-server/dist/index.js"]
    }
  }
}
```

### Available Tools
| Tool | Description |
|---|---|
| `generate_tests` | Generate test cases using AI for any URL |
| `run_ui_tests` | Execute Playwright UI tests |
| `run_api_tests` | Execute RestAssured API tests |
| `get_test_results` | Retrieve latest test results |

### Usage
Simply ask Claude:
```
"Run my UI tests"
"Generate test cases for https://example.com"
"Run API tests for UserTests class"
"Get my latest test results"
```

---

## 🔄 CI/CD Pipeline

GitHub Actions automatically runs all tests on:
- Every push to `main`
- Every pull request to `main`
- Daily at 9AM IST (scheduled)

### Pipeline Jobs
```
Push to main
     ↓
┌─────────────────┐  ┌─────────────────┐
│  UI Tests Job   │  │  API Tests Job  │
│  (Playwright)   │  │  (RestAssured)  │
│  15 tests       │  │  8 tests        │
└─────────────────┘  └─────────────────┘
     ↓                      ↓
   HTML Report         Surefire Report
   (Artifact)          (Artifact)
```

---

## 📊 Data Driven Testing

Test data is managed through Excel files and converted to JSON:

```bash
cd web-tests
npx ts-node utils/excelToJson.ts
```

### Test Data Structure
| userType | Description |
|---|---|
| validUser | Valid registered credentials |
| invalidUser | Wrong email/password |
| emptyData | Empty fields |
| sqlInjection | SQL Injection payload |
| xssAttack | XSS Attack payload |

---

## 🏗️ Framework Architecture

```
                    ┌─────────────────┐
                    │   Groq AI API   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   AI Engine     │
                    │ (Test Generator)│
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │                             │
    ┌─────────▼────────┐        ┌──────────▼────────┐
    │   Playwright     │        │   RestAssured      │
    │   UI Tests       │        │   API Tests        │
    │   (TypeScript)   │        │   (Java)           │
    └─────────┬────────┘        └──────────┬─────────┘
              │                             │
              └──────────────┬──────────────┘
                             │
                    ┌────────▼────────┐
                    │   MCP Server    │
                    │  (AI Agent)     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Claude Desktop │
                    │  (You talk here)│
                    └─────────────────┘
```

---

## 👨‍💻 Author

**Siddharth Parashar**
- GitHub: [@Sparashar-coder](https://github.com/Sparashar-coder)

---

## 📝 License

This project is licensed under the MIT License.
