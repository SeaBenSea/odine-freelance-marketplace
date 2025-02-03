import { test, expect } from '@playwright/test';
import {
  testA11yMobileViewport,
  testA11yTabletViewport,
  testA11yDesktopViewport,
} from '../lib/a11y-helpers';

test.describe.parallel('Dashboard Page', () => {
  const pageUrl = 'http://localhost:6006/iframe.html?id=dashboard--default';

  test.describe('Accessibility Tests', () => {
    test('should follow a11y best practices on desktop', async ({ page }) => {
      await testA11yDesktopViewport(page, pageUrl);
    });

    test('should follow a11y best practices on tablet', async ({ page }) => {
      await testA11yTabletViewport(page, pageUrl);
    });

    test('should follow a11y best practices on mobile', async ({ page }) => {
      await testA11yMobileViewport(page, pageUrl);
    });
  });

  test.describe('Functional Tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(pageUrl);
    });

    test('should display freelancer list with all required details', async ({ page }) => {
      const freelancerList = page.getByRole('list', {
        name: /freelancers list/i,
      });
      await expect(freelancerList).toBeVisible();

      const firstFreelancer = freelancerList.getByRole('listitem').first();
      await expect(firstFreelancer.getByRole('heading')).toBeVisible();
      await expect(firstFreelancer.getByText(/email:/i)).toBeVisible();
      await expect(firstFreelancer.getByText(/phone:/i)).toBeVisible();
      await expect(firstFreelancer.getByRole('img', { name: /profile/i })).toBeVisible();
      await expect(firstFreelancer.getByText(/finished jobs:/i)).toBeVisible();
      await expect(firstFreelancer.getByText(/city:/i)).toBeVisible();
    });

    test('should filter freelancers by name', async ({ page }) => {
      const nameInput = page.getByRole('searchbox', {
        name: /search by name/i,
      });
      await nameInput.fill('Jane');

      const freelancerList = page.getByRole('list', {
        name: /freelancers list/i,
      });
      const filteredItems = freelancerList.getByRole('listitem');

      await expect(async () => {
        const items = await filteredItems.all();
        expect(items.length).toBeGreaterThan(0);

        for (const item of items) {
          const name = await item.getByRole('heading').textContent();
          expect(name.toLowerCase()).toContain('jane');
        }
      }).toPass();

      const nonMatchingItems = await filteredItems.filter({ hasText: /john/i }).count();
      expect(nonMatchingItems).toBe(0);
    });

    test('should filter freelancers by city', async ({ page }) => {
      const cityInput = page.getByRole('searchbox', {
        name: /search by city/i,
      });
      await cityInput.fill('Gwenborough');

      const freelancerList = page.getByRole('list', {
        name: /freelancers list/i,
      });
      const filteredItems = freelancerList.getByRole('listitem');

      await expect(async () => {
        const items = await filteredItems.all();
        expect(items.length).toBeGreaterThan(0);

        for (const item of items) {
          const city = await item.getByText(/city:/i).textContent();
          expect(city.toLowerCase()).toContain('gwenborough');
        }
      }).toPass();
    });

    test('should filter freelancers by finished job count range', async ({ page }) => {
      const minInput = page.getByRole('spinbutton', { name: /minimum jobs/i });
      const maxInput = page.getByRole('spinbutton', { name: /maximum jobs/i });

      await minInput.fill('2');
      await maxInput.fill('5');

      const freelancerList = page.getByRole('list', {
        name: /freelancers list/i,
      });
      const filteredItems = freelancerList.getByRole('listitem');

      await expect(async () => {
        const items = await filteredItems.all();
        expect(items.length).toBeGreaterThan(0);

        for (const item of items) {
          const jobCountText = await item.getByText(/finished jobs:/i).textContent();
          const jobCount = parseInt(jobCountText.match(/\d+/)[0]);
          expect(jobCount).toBeGreaterThanOrEqual(2);
          expect(jobCount).toBeLessThanOrEqual(5);
        }
      }).toPass();
    });

    test('should handle no results found', async ({ page }) => {
      const nameInput = page.getByRole('searchbox', {
        name: /search by name/i,
      });
      await nameInput.fill('NonexistentName123');

      await expect(page.getByText(/no results found/i)).toBeVisible();

      const freelancerList = page.getByRole('list', {
        name: /freelancers list/i,
      });
      await expect(freelancerList.getByRole('listitem')).toHaveCount(0);
    });

    test('should toggle light/dark mode', async ({ page }) => {
      const themeToggle = page.getByRole('button', { name: /toggle theme/i });

      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

      await themeToggle.click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

      await themeToggle.click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    });
  });
});
