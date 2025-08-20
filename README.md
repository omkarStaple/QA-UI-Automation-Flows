# QA UI Automation Flows - Playwright Test Suite

A comprehensive Playwright-based test automation framework for testing document processing flows with multi-environment support.

## 🎯 Overview

This test suite automates critical user workflows for document processing applications, including:
- **Galaxy Model Flow**: Custom model document processing with validation
- **Invoice DocScanner Flow**: Invoice document scanning and field extraction
- **Multi-environment Testing**: Support for 4 different environments
- **Dynamic Table Validation**: Automated detection and validation of data tables
- **Comprehensive Field Validation**: Critical sidebar field verification

## 🏗️ Project Structure

```
├── tests/                          # Test specifications
│   ├── galaxyModel.spec.ts         # Galaxy model workflow tests
│   ├── invoiceDocscannerFlow.spec.ts # Invoice scanning workflow tests
│   ├── example.spec.ts             # Basic example tests
│   ├── flowTest.spec.ts            # Additional flow tests
│   ├── MultipleLabelsFlowTest.spec.ts # Multi-label testing
│   └── TemplateFlow.spec.ts        # Template-based tests
├── tests-examples/                 # Playwright example tests
│   └── demo-todo-app.spec.ts       # Demo application tests
├── utils/                          # Utility functions
│   └── environment.ts              # Environment configuration management
├── test-results/                   # Test execution results (gitignored)
├── playwright-report/              # HTML test reports (gitignored)
├── .env.example                    # Environment variables template
├── .env                           # Environment variables (gitignored)
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Dependencies and scripts
├── ENVIRONMENT_SETUP.md           # Detailed environment setup guide
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/staple-ai/QA-API-Automation.git
   cd QA-API-Automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your actual credentials (see [Environment Configuration](#environment-configuration))

## 🔧 Environment Configuration

### Supported Environments

The framework supports 4 different environments:

1. **Environment 1**: `https://app.staple.io/login?`
2. **Environment 2**: `https://us.staple.io/login?`
3. **Environment 3**: `https://eu.staple.io/login?`
4. **Environment 4**: `https://dash.stapleai.cn/login`

### Configuration Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your credentials:**
   ```env
   # Environment 1: app.staple.io
   URL_SITE_1=https://app.staple.io/login?
   USERNAME_1=your_username_1
   PASSWORD_1=your_password_1

   # Environment 2: us.staple.io
   URL_SITE_2=https://us.staple.io/login?
   USERNAME_2=your_username_2
   PASSWORD_2=your_password_2

   # Set current environment (1, 2, 3, or 4)
   CURRENT_ENV=1
   ```

3. **Switch environments by changing `CURRENT_ENV` value**

For detailed setup instructions, see [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)

## 🧪 Test Execution

### Running All Tests

```bash
# Run all tests
npx playwright test

# Run tests with UI (headed mode)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug
```

### Running Specific Tests

```bash
# Run Galaxy Model tests only
npx playwright test tests/galaxyModel.spec.ts

# Run Invoice DocScanner tests only
npx playwright test tests/invoiceDocscannerFlow.spec.ts

# Run tests matching a pattern
npx playwright test --grep "validation"
```

### Running Tests in Different Browsers

```bash
# Run in Chromium (default)
npx playwright test --project=chromium

# Run in Firefox
npx playwright test --project=firefox

# Run in WebKit (Safari)
npx playwright test --project=webkit
```

### Environment-Specific Testing

```bash
# Test specific environment by updating .env file
# Set CURRENT_ENV=2 in .env, then run:
npx playwright test

# Or use environment variables directly
CURRENT_ENV=3 npx playwright test
```

## 📊 Test Reports and Results

### HTML Reports

After test execution, view comprehensive HTML reports:

```bash
# Generate and open HTML report
npx playwright show-report
```

The HTML report includes:
- ✅ Test execution summary
- 📸 Screenshots on failures
- 🎬 Video recordings of test runs
- 📋 Detailed step-by-step execution logs
- ⏱️ Performance metrics

### Test Results Structure

```
test-results/
├── test-name-browser/
│   ├── trace.zip           # Playwright trace files
│   ├── video.webm          # Test execution video
│   └── screenshot.png      # Failure screenshots
└── .last-run.json         # Last execution summary
```

### Continuous Integration Reports

The framework generates CI-friendly outputs:
- **JUnit XML**: For CI/CD integration
- **JSON Reports**: For custom reporting tools
- **Allure Reports**: Enhanced reporting with Allure integration

## 🔍 Test Features

### Core Test Flows

#### 1. Galaxy Model Flow (`galaxyModel.spec.ts`)
- **Purpose**: Tests custom model document processing
- **Features**:
  - Queue creation with custom models
  - Document upload and processing
  - Table presence validation
  - Critical field validation (CurrencyCode, PaymentTerms, PONumber, etc.)
  - Processing status monitoring

#### 2. Invoice DocScanner Flow (`invoiceDocscannerFlow.spec.ts`)
- **Purpose**: Tests invoice document scanning and extraction
- **Features**:
  - Invoice-specific queue creation
  - Smart table processing
  - Field extraction validation (Description, DocumentType, InvoiceNumber, etc.)
  - Document translation settings
  - End-to-end invoice processing

### Advanced Features

#### Dynamic Table Detection
```typescript
// Automatically detects and validates table presence
const tableIsPresent = await isAnyTablePresent(page);
expect.soft(tableIsPresent).toBe(true);
```

#### Environment-Aware Testing
```typescript
// Automatically adapts to different environments
const env = getEnvironment();
await page.goto(env.url);
await page.fill('input[placeholder="email"]', env.username);
```

#### Soft Assertions
- Non-blocking assertions that allow tests to continue
- Comprehensive validation reporting
- Better debugging capabilities

## 🛠️ Development

### Adding New Tests

1. **Create a new test file** in the `tests/` directory:
   ```typescript
   import { test, expect } from '@playwright/test';
   import { getEnvironment } from '../utils/environment';

   test('New test description', async ({ page }) => {
     const env = getEnvironment();
     await page.goto(env.url);
     // Your test logic here
   });
   ```

2. **Follow naming conventions**:
   - Use descriptive file names: `featureName.spec.ts`
   - Use clear test descriptions
   - Group related tests in the same file

### Environment Utilities

The `utils/environment.ts` module provides:

```typescript
// Get current environment (based on CURRENT_ENV)
const env = getEnvironment();

// Get specific environment
const env1 = getEnv1();
const env2 = getEnv2();

// Get environment by number
const env = getEnvironment('3');
```

### Custom Helper Functions

Create reusable functions for common operations:

```typescript
// Example: Table validation helper
async function isAnyTablePresent(page: Page): Promise<boolean> {
  const tableTitleLocator = page.getByText(/Table \d+ title/);
  return await tableTitleLocator.first().isVisible({ timeout: 5000 });
}
```

## 🐛 Debugging

### Debug Mode
```bash
# Run tests in debug mode (step-by-step execution)
npx playwright test --debug

# Debug specific test
npx playwright test tests/galaxyModel.spec.ts --debug
```

### Trace Viewer
```bash
# View trace for failed tests
npx playwright show-trace test-results/test-name/trace.zip
```

### Screenshots and Videos
- Screenshots are automatically captured on failures
- Videos are recorded for all test runs
- Configure in `playwright.config.ts`

## 📝 Best Practices

### 1. Environment Management
- ✅ Always use environment variables for credentials
- ✅ Never commit `.env` files
- ✅ Use `.env.example` as a template
- ✅ Validate environment configuration before tests

### 2. Test Structure
- ✅ Use descriptive test names
- ✅ Group related tests logically
- ✅ Use soft assertions for non-critical validations
- ✅ Add meaningful console logs for debugging

### 3. Locator Strategy
- ✅ Prefer semantic locators (`getByRole`, `getByText`)
- ✅ Use data-testid attributes when possible
- ✅ Avoid brittle CSS selectors
- ✅ Make locators environment-agnostic

### 4. Error Handling
- ✅ Use appropriate timeouts
- ✅ Handle dynamic content properly
- ✅ Add retry mechanisms for flaky operations
- ✅ Provide clear error messages

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-test`
3. **Add your tests** following the existing patterns
4. **Update documentation** if needed
5. **Run tests**: `npm test`
6. **Submit a pull request**

### Code Style

- Use TypeScript for all test files
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Maintain consistent indentation and formatting

## 📞 Support

For questions or issues:

1. **Check existing documentation** in this README and `ENVIRONMENT_SETUP.md`
2. **Review test examples** in the `tests/` directory
3. **Check Playwright documentation**: https://playwright.dev
4. **Contact the QA team** for environment-specific issues

## 📄 License

This project is part of the Staple AI quality assurance initiative.

---

**Happy Testing!** 🚀
