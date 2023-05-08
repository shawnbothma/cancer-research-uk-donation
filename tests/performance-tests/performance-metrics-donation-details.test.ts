import { test } from '@playwright/test';

// Measuring Donation Details Page Performance Metrics
test('Paint Timing API provides information on the first paint and the first contentful paint. ', async ({ page }) => {

    // Go to Cancer Research UK Donation
    await page.goto('support-us/your-donation');

    // Select cookies
    await page.getByRole('button', { name: '✓ OK, continue to site' }).click();
    await page.waitForLoadState('domcontentloaded');

    const paintTimingJson = await page.evaluate(() =>
        JSON.stringify(window.performance.getEntriesByType('paint'))
    )
    const paintTiming = JSON.parse(paintTimingJson)

    console.log(paintTiming)

    await page.close()
});


test('Largest Contentful Paint API provides information on all large paints.', async ({ page }) => {

    // Go to Cancer Research UK Donation
    await page.goto('support-us/your-donation');

    // Select cookies
    await page.getByRole('button', { name: '✓ OK, continue to site' }).click();
    await page.waitForLoadState('domcontentloaded');

    const largestContentfulPaint: any = await page.evaluate(() => {
        return new Promise((resolve) => {
            new PerformanceObserver((l) => {
                const entries = l.getEntries()
                // the last entry is the largest contentful paint
                const largestPaintEntry: any = entries.at(-1)
                resolve(largestPaintEntry.startTime)
            }).observe({
                type: 'largest-contentful-paint',
                buffered: true
            })
        })
    })

    console.log('Largest Contentful Paint:', parseFloat(largestContentfulPaint))

    await page.close()
});

test('Navigation Timing API provides navigation response time, the used protocol, document load time etc.', async ({ page }) => {

    // Go to Cancer Research UK Donation
    await page.goto('support-us/your-donation');

    // Select cookies
    await page.getByRole('button', { name: '✓ OK, continue to site' }).click();
    await page.waitForLoadState('domcontentloaded');

    const navigationTimingJson = await page.evaluate(() =>
        JSON.stringify(performance.getEntriesByType('navigation'))
    )
    const navigationTiming = JSON.parse(navigationTimingJson)

    console.log(navigationTiming)

    await page.close()
});