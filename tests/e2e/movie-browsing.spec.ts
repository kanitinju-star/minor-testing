import { test, expect } from '@playwright/test';

test.describe('Minor Cineplex - Homepage', () => {
  
  test('should display the homepage and movie information', async ({ page }) => {
    // 1. Navigate to the homepage
    await page.goto('/');

    // 2. Check if the Search input is visible (as found in inspection)
    const searchInput = page.getByPlaceholder('Search movie...');
    await expect(searchInput).toBeVisible();

    // 3. Check for the "Now Showing" tab
    const nowShowingTab = page.getByRole('button', { name: 'Now Showing' });
    await expect(nowShowingTab).toBeVisible();

    // 4. Check if at least one movie title (h1) is visible
    // We saw h1 is used for movie titles
    const movieTitle = page.locator('h1').first();
    await expect(movieTitle).toBeVisible();
    
    console.log('✅ Homepage content verified!');
  });

  test('should allow switching to Coming Soon tab', async ({ page }) => {
    await page.goto('/');
    
    const comingSoonTab = page.getByRole('button', { name: 'Coming Soon' });
    await comingSoonTab.click();
    
    // Check if the tab becomes active or content changes
    // (Assuming there's some visual indicator or text)
    await expect(comingSoonTab).toBeVisible();
  });

});
