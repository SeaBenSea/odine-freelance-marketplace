import { test, expect } from '@playwright/test';

test.describe('Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');

    const freelancerList = page.getByRole('list', {
      name: /freelancers list/i,
    });
    const firstFreelancer = freelancerList.getByRole('listitem').first();
    await firstFreelancer.click();
  });

  test('should handle hire freelancer form submission', async ({ page }) => {
    await page.getByRole('button', { name: /hire freelancer/i }).click();
    const hireDialog = page.getByRole('dialog', { name: /hire freelancer/i });

    await hireDialog.getByRole('textbox', { name: /name/i }).fill('Alice Smith');
    await hireDialog.getByRole('textbox', { name: /subject/i }).fill('Project Inquiry');
    await hireDialog
      .getByRole('textbox', { name: /message/i })
      .fill('I would like to discuss a potential project collaboration.');

    await hireDialog.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByRole('alert')).toContainText(/request sent successfully/i);
    await expect(hireDialog).not.toBeVisible();
  });
});
