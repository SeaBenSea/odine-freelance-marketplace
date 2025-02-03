import { test, expect } from '@playwright/test';
import {
  testA11yMobileViewport,
  testA11yTabletViewport,
  testA11yDesktopViewport,
} from '../lib/a11y-helpers';

test.describe('Portfolio Integration Tests', () => {
  const pageUrl = 'http://localhost:6006/iframe.html?id=portfolio--default';

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

    test('should display complete freelancer information', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /freelancer profile/i })).toBeVisible();

      const personalInfo = page.getByRole('region', {
        name: /personal information/i,
      });
      await expect(personalInfo.getByText(/name:/i)).toBeVisible();
      await expect(personalInfo.getByText(/phone:/i)).toBeVisible();

      await expect(page.getByRole('img', { name: /profile picture/i })).toBeVisible();

      await expect(page.getByRole('link', { name: /website/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /email/i })).toBeVisible();
    });

    test('should display past jobs with comment counts', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /past jobs/i })).toBeVisible();

      const jobsList = page.getByRole('list', { name: /past jobs/i });
      await expect(jobsList).toBeVisible();

      const jobs = jobsList.getByRole('listitem');
      const count = await jobs.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const job = jobs.nth(i);

        await expect(job.getByRole('heading')).toBeVisible();
        await expect(job.getByText(/description:/i)).toBeVisible();

        const commentCountText = await job.getByText(/comments:/i).textContent();
        expect(parseInt(commentCountText.match(/\d+/)[0])).toBeGreaterThanOrEqual(0);

        await expect(job.getByRole('button', { name: /show comments/i })).toBeVisible();
      }
    });

    test('should show and hide comments for jobs', async ({ page }) => {
      const jobsList = page.getByRole('list', { name: /past jobs/i });
      const jobs = jobsList.getByRole('listitem');

      const count = await jobs.count();
      for (let i = 0; i < count; i++) {
        const job = jobs.nth(i);

        const commentCountText = await job.getByText(/comments:/i).textContent();
        const expectedCount = parseInt(commentCountText.match(/\d+/)[0]);

        const showCommentsBtn = job.getByRole('button', {
          name: /show comments/i,
        });
        await showCommentsBtn.click();

        const commentsSection = job.getByRole('region', { name: /comments/i });
        await expect(commentsSection).toBeVisible();

        if (expectedCount > 0) {
          const comments = commentsSection.getByRole('listitem');
          const actualCount = await comments.count();
          expect(actualCount).toBe(expectedCount);

          const firstComment = comments.first();
          await expect(firstComment.getByText(/name:/i)).toBeVisible();
          await expect(firstComment.getByText(/email:/i)).toBeVisible();
          await expect(firstComment.getByText(/comment:/i)).toBeVisible();
        } else {
          await expect(commentsSection.getByText(/no comments yet/i)).toBeVisible();
        }

        await showCommentsBtn.click();
        await expect(commentsSection).not.toBeVisible();
      }
    });

    test('should handle hire freelancer popup workflow', async ({ page }) => {
      const hireButton = page.getByRole('button', { name: /hire freelancer/i });
      await hireButton.click();

      const popup = page.getByRole('dialog', { name: /hire freelancer/i });
      await expect(popup).toBeVisible();

      const nameInput = popup.getByRole('textbox', { name: /name/i });
      const subjectInput = popup.getByRole('textbox', { name: /subject/i });
      const messageInput = popup.getByRole('textbox', { name: /message/i });

      await expect(nameInput).toBeVisible();
      await expect(subjectInput).toBeVisible();
      await expect(messageInput).toBeVisible();

      await nameInput.fill('Test User');
      await subjectInput.fill('Project Inquiry');
      await messageInput.fill('I would like to discuss a potential project.');

      await page.route('**/api/hire', (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true }),
        });
      });

      await popup.getByRole('button', { name: /submit/i }).click();

      await expect(page.getByText(/request sent successfully/i)).toBeVisible();
      await expect(popup).not.toBeVisible();
    });

    test('should validate hire freelancer form', async ({ page }) => {
      await page.getByRole('button', { name: /hire freelancer/i }).click();
      const popup = page.getByRole('dialog', { name: /hire freelancer/i });

      await popup.getByRole('button', { name: /submit/i }).click();

      const nameInput = popup.getByRole('textbox', { name: /name/i });
      const subjectInput = popup.getByRole('textbox', { name: /subject/i });
      const messageInput = popup.getByRole('textbox', { name: /message/i });

      await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      await expect(subjectInput).toHaveAttribute('aria-invalid', 'true');
      await expect(messageInput).toHaveAttribute('aria-invalid', 'true');

      await nameInput.fill('Test User');
      await popup.getByRole('button', { name: /submit/i }).click();

      await expect(nameInput).not.toHaveAttribute('aria-invalid', 'true');
      await expect(subjectInput).toHaveAttribute('aria-invalid', 'true');
      await expect(messageInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
