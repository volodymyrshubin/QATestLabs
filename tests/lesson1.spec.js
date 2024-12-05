const {test , expect} = require('playwright/test');

test('Demo Qa site has title', async ({ page }) => {
    await page.goto('https://demoqa.com/');
  
    await expect(page).toHaveTitle('DEMOQA');
  });