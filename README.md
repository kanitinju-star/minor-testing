# 🎬 Minor Cineplex - QA & Test Automation Suite

[![CI](https://github.com/kanitinju-star/minor-testing/actions/workflows/ci.yml/badge.svg)](https://github.com/kanitinju-star/minor-testing/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/tests-7%20passed-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-92.85%25-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.60-orange?logo=playwright)
![Vitest](https://img.shields.io/badge/Vitest-4.x-yellow?logo=vitest)

This project is a dedicated automated testing repository for the **Minor Cineplex** full-stack application. It serves as a professional showcase of modern software quality assurance practices, demonstrating a complete implementation of the **Testing Pyramid**.

> 🔗 **Main project:** [minor-cineplex](https://github.com/kanitinju-star) · **This repo** covers the full QA & automation layer.

---

## 🎯 Testing Strategy & Goals
- **End-to-End (E2E) Testing:** Automated user journeys using [Playwright](https://playwright.dev/).
- **Integration Testing:** API endpoint validation using [Vitest](https://vitest.dev/) and [Supertest](https://www.npmjs.com/package/supertest).
- **Unit Testing:** Isolated business logic verification using [Vitest](https://vitest.dev/).
- **Structured QA Documentation:** Comprehensive Test Plans and Bug Reports.
- **Continuous Integration:** GitHub Actions workflow runs tests on every push.

---

## 🛠 Tech Stack
- **Frameworks:** Playwright, Vitest
- **Language:** TypeScript
- **API Testing:** Supertest
- **Reporting:** Playwright HTML Report, v8 Coverage
- **CI/CD:** GitHub Actions

---

## 📊 Test Coverage Report

*Coverage generated from `npm run test:unit -- --coverage` — last run: July 2026*

| File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|------|---------|----------|---------|---------|-------------------|
| **All files** | **92.85** | **71.42** | **100.00** | **92.30** | |
| `src/utils/booking.ts` | 92.85 | 71.42 | 100.00 | 92.30 | 44 |

*(Run `npm run test:unit -- --coverage` to regenerate the latest report)*

---

## 🚦 CI/CD Pipeline

Every push to `main` triggers the GitHub Actions workflow automatically:

```
push to main
    └── unit-tests job (ubuntu-latest, Node 20)
            ├── npm ci
            ├── vitest run tests/unit --coverage
            └── upload coverage artifact
```

E2E and Integration tests require a live application server and are run locally or in a dedicated staging environment.

---

## 🧪 Example: End-to-End (E2E) Test Snippet
A sample Playwright script validating the homepage and movie browsing experience:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Minor Cineplex - Movie Browsing', () => {
  
  test('should display the homepage and movie information', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5173');

    // Verify search functionality is visible
    const searchInput = page.getByPlaceholder('Search movie...');
    await expect(searchInput).toBeVisible();

    // Verify "Now Showing" tab
    const nowShowingTab = page.getByRole('button', { name: 'Now Showing' });
    await expect(nowShowingTab).toBeVisible();

    // Verify movie titles are rendering
    const movieTitle = page.locator('h1').first();
    await expect(movieTitle).toBeVisible();
  });
});
```

---

## 🚀 How to Run Tests

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run Unit tests with coverage (Vitest):**
    ```bash
    npm run test:unit -- --coverage
    ```
3.  **Run Integration tests** *(requires backend at `localhost:4000`)*:
    ```bash
    npm run test:integration
    ```
4.  **Run E2E tests** *(requires full app at `localhost:3000`)*:
    ```bash
    npm run test
    ```
    *To view the interactive HTML report:* `npm run test:report`

---

## 📁 Project Structure

```
minor-cineplex-testing/
├── .github/workflows/
│   └── ci.yml              # GitHub Actions CI pipeline
├── src/
│   └── utils/
│       └── booking.ts      # Shared business logic (mirrored from server)
├── tests/
│   ├── e2e/                # Playwright end-to-end specs
│   ├── integration/        # Supertest API integration tests
│   └── unit/               # Vitest unit tests
├── docs/                   # QA documentation (Test Plans, Bug Reports)
├── playwright.config.ts
└── vitest.config.ts
```

---
*Created by Kanitin Juthasompakorn*
