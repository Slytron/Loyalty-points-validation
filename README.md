# Loyalty Points Tests

Automated **Playwright** test suite for the loyalty points application, organized for maintainability and CI use.

## Repo Structure

```text
tests/
  e2e/
    auth/
      login.spec.ts
    dashboard/
      view_stats.spec.ts
  fixtures/
    users.json
    testData.json
  pageObjects/
    LoginPage.ts
    DashboardPage.ts
  support/
    env.ts
    calculations.ts
.github/workflows/
  playwright.yml
playwright.config.ts
package.json
```

## Test Types

- **Smoke tests**: critical auth path (`@smoke`)
- **E2E tests**: broader validation such as loyalty balance logic

## Quick Start

1. Install dependencies:

```bash
npm ci
```

2. Create your env file:

```bash
cp .env.example .env
```

3. Run tests:

```bash
npm run test:smoke
npm run test:e2e
```

## Available Scripts

- `npm run test`: run all tests
- `npm run test:headed`: run tests in headed mode
- `npm run test:smoke`: run smoke-tagged tests
- `npm run test:e2e`: run tests excluding smoke
- `npm run lint`: lint TypeScript files
- `npm run report`: open HTML report

## CI Workflow

GitHub Actions workflow at `.github/workflows/playwright.yml`:

- runs smoke tests on `push` to `main`
- runs full E2E suite on manual/scheduled triggers
- uploads Playwright HTML report and test artifacts
=======


