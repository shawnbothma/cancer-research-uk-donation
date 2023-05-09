import { test, expect, devices } from '@playwright/test';

    test('Your Donation on Chrome Desktop', async ({ page }) => {
        await page.setViewportSize(devices["Desktop Chrome"].viewport);
        // Go to Cancer Research UK Donation
        await page.goto('support-us/your-donation');

        // Select cookies
        await page.getByRole('button', { name: '✓ OK, continue to site' }).click();
        await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixels: 100 });
        await page.close();
    });

    test('Your Details on Galaxy S9+ portrait', async ({ page }) => {
        await page.setViewportSize(devices["Galaxy S9+"].viewport);
        // Go to Cancer Research UK Donation
        await page.goto('support-us/details');

        // Select cookies
        await page.getByRole('button', { name: '✓ OK, continue to site' }).click();
        await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixels: 100 });
        await page.close();
    });