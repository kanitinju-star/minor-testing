# 🎬 Minor Cineplex - QA & Test Automation Suite

This project is a dedicated automated testing repository for the **Minor Cineplex** full-stack application. It serves as a professional showcase of modern software quality assurance practices, demonstrating a complete implementation of the **Testing Pyramid**.

## 🎯 Testing Strategy & Goals
- **End-to-End (E2E) Testing:** Automated user journeys using [Playwright](https://playwright.dev/).
- **Integration Testing:** API endpoint validation using [Vitest](https://vitest.dev/) and [Supertest](https://www.npmjs.com/package/supertest).
- **Unit Testing:** Isolated business logic verification using [Vitest](https://vitest.dev/).
- **Structured QA Documentation:** Comprehensive Test Plans and Bug Reports.

---

## 🛠 Tech Stack
- **Frameworks:** Playwright, Vitest
- **Language:** TypeScript
- **API Testing:** Supertest
- **Reporting:** Playwright HTML Report, v8 Coverage

---

## 📊 Test Coverage Report

*Example of test coverage across the application:*

| File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|------|---------|----------|---------|---------|-------------------|
| **All files** | **85.45** | **90.32** | **88.88** | **85.45** | |
| `controllers/` | 82.10 | 85.00 | 80.00 | 82.10 | 45, 52-54 |
| `services/` | 91.50 | 95.20 | 100.00 | 91.50 | 112 |
| `utils/` | 100.00 | 100.00 | 100.00 | 100.00 | |

*(Run `npm run test:coverage` to generate the latest visual report)*

---

## 🧪 Example: End-to-End (E2E) Test Snippet
A sample Playwright script validating the homepage and movie browsing experience:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Minor Cineplex - Movie Browsing', () => {
  
  test('should display the homepage and movie information', async ({ page }) => {
    // Navigate to the homepage
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

## 🚦 How to Run Tests

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run E2E tests (Playwright):**
    ```bash
    npm run test
    ```
    *To view the UI report:* `npm run test:ui`
3.  **Run Unit & Integration tests (Vitest):**
    ```bash
    npm run test:unit
    npm run test:integration
    ```

---
*Created by Kanitin Juthasompakorn*
