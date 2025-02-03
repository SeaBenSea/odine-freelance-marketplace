import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
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

  test('shows error message when no freelancers returned', async ({ page }) => {
    await page.route('**/users', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      });
    });

    await page.reload();

    await expect(page.getByRole('alert')).toContainText(/no results found/i);

    await expect(page.queryByRole('list')).not.toBeInTheDocument();
  });

  test('should navigate to portfolio page', async ({ page }) => {
    const freelancerList = page.getByRole('list', {
      name: /freelancers list/i,
    });
    const firstFreelancer = freelancerList.getByRole('listitem').first();

    const freelancerName = await firstFreelancer.getByRole('heading').textContent();

    await firstFreelancer.getByRole('link', { name: /view profile/i }).click();

    await expect(page).toHaveURL(/\/portfolio\/\d+/);
    await expect(page.getByRole('heading', { name: freelancerName })).toBeVisible();
    await expect(page.getByRole('region', { name: /contact information/i })).toBeVisible();
  });
});
