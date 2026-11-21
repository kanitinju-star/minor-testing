# 🎬 Minor Cineplex - QA & Test Automation Suite

[![CI - Unit Tests](https://github.com/kanitinju-star/minor-testing/actions/workflows/ci.yml/badge.svg)](https://github.com/kanitinju-star/minor-testing/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/unit_tests-7%20passed-brightgreen)
![Coverage](https://img.shields.io/badge/coverage_(booking_logic)-92.85%25-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.60-orange?logo=playwright)
![Vitest](https://img.shields.io/badge/Vitest-4.x-yellow?logo=vitest)

This is a **learning project** — an automated testing repository for the [Minor Cineplex](https://github.com/bzforest/mijor-client) full-stack application, built to practice modern software quality assurance and the **Testing Pyramid** approach (Unit → Integration → E2E).

> 🔗 **Main project:** [Minor Cineplex (mijor-client)](https://github.com/bzforest/mijor-client) · **This repo** covers the QA & automation layer.

---

## 📋 Test Cases Summary

| ID | Test Case | Type | Status |
|----|-----------|------|--------|
| TC-001 | Browse movies on homepage | E2E (Playwright) | ✅ Implemented |
| TC-002 | Switch to "Coming Soon" tab | E2E (Playwright) | ✅ Implemented |
| TC-003 | GET /movies returns movie list | Integration (Supertest) | ✅ Implemented |
| TC-004 | GET /movies/invalid-id returns 404 | Integration (Supertest) | ✅ Implemented |
| TC-005 | Discount calculation (7 scenarios) | Unit (Vitest) | ✅ 7/7 Passed |

> 📄 Full details: [Test Plan](docs/test-plan.md) · [Bug Report](docs/bug-report.md)

### 🐛 Bugs Found

| Bug ID | Title | Severity | Status |
|--------|-------|----------|--------|
| BUG-001 | Server returns 500 instead of 404 on invalid movie ID | Medium | Open |
| BUG-002 | "Coming Soon" tab has no visual active state | Low | Open |
| BUG-003 | Search shows blank area instead of "No results" message | Low | Open |

---

## 🎯 Testing Strategy & Goals

### Tested Flows
| Flow | Test Type | Description |
|------|-----------|-------------|
| 🎬 Movie Browsing | E2E (Playwright) | Homepage load, movie cards, tab switching |
| 🔍 Movie Search | Manual (documented) | Search by title, no-results handling |
| 🎥 Showtime Selection | Manual (documented) | Click movie → view showtimes |
| 💺 Seat Selection | Manual (documented) | Select/deselect seats, booked seat validation |
| 💳 Booking & Payment | Manual (documented) | Complete booking flow, coupon application |
| 🎟️ Discount Calculation | Unit (Vitest) | 7 coupon types: %, fixed, free, BOGO, fixed price |
| 🔌 Movies API | Integration (Supertest) | GET /movies, error handling on invalid ID |

### Testing Approach
- **Unit Testing:** Isolated business logic verification (booking/discount calculation) using [Vitest](https://vitest.dev/) — 92.85% coverage on `booking.ts`.
- **Integration Testing:** API endpoint validation using [Vitest](https://vitest.dev/) and [Supertest](https://www.npmjs.com/package/supertest).
- **End-to-End (E2E) Testing:** Automated user journeys using [Playwright](https://playwright.dev/).
- **Manual Testing:** Documented test cases for flows that require live user interaction (seat selection, payment).
- **QA Documentation:** Test plans and bug reports in [`docs/`](docs/).
- **CI:** GitHub Actions runs unit tests automatically on every push.

---

## 🛠 Tech Stack
- **Frameworks:** Playwright, Vitest
- **Language:** TypeScript
- **API Testing:** Supertest
- **Reporting:** Playwright HTML Report, v8 Coverage
- **CI:** GitHub Actions (unit tests only)

---

## 📊 Test Coverage Report

> ⚠️ Coverage applies to **booking logic** (`src/utils/booking.ts`) only — not the entire application.

*Generated from `npm run test:unit -- --coverage`*

| File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|------|---------|----------|---------|---------|-------------------|
| `src/utils/booking.ts` | **92.85** | **71.42** | **100.00** | **92.30** | 44 |

*(Run `npm run test:unit -- --coverage` to regenerate the latest report)*

---

## 🚦 CI Pipeline

Every push to `main` triggers GitHub Actions to run **unit tests only**:

```
push to main
    └── unit-tests job (ubuntu-latest, Node 20)
            ├── npm ci
            ├── vitest run tests/unit --coverage
            └── upload coverage artifact
```

> **Note:** E2E and Integration tests require a live application server and are run locally or in a dedicated staging environment. This is not a full CI/CD pipeline.

---

## 🧪 Example: End-to-End (E2E) Test Snippet
A sample Playwright script validating the homepage and movie browsing experience:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Minor Cineplex - Movie Browsing', () => {
  
  test('should display the homepage and movie information', async ({ page }) => {
    // Navigate to the homepage (baseURL: http://localhost:3000)
    await page.goto('/');

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
│   └── ci.yml              # GitHub Actions CI (unit tests)
├── src/
│   └── utils/
│       └── booking.ts      # Shared business logic (mirrored from server)
├── tests/
│   ├── e2e/                # Playwright end-to-end specs
│   ├── integration/        # Supertest API integration tests
│   └── unit/               # Vitest unit tests
├── docs/
│   ├── test-plan.md        # Test plan document
│   └── bug-report.md       # Bug report document
├── playwright.config.ts
└── vitest.config.ts
```

---
*Created by Kanitin Juthasompakorn · This is a personal project for practicing and learning QA & Test Automation.*
