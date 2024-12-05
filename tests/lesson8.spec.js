const { test, expect } = require('@playwright/test');

test('Check alert modal window text and close it', async ({ page }) =>
    {
        await page.goto('https://demoqa.com/alerts');
        page.on('dialog', async dialog => 
            {
                //console.log(dialog.type());
                expect(dialog.type()).toEqual('alert');
                //console.log(dialog.message());
                expect(dialog.message()).toEqual('You clicked a button');
                await dialog.accept();
            });
        await page.locator('#alertButton').click();
    
    });

test('Check confirmation modal window text and verify message to appear', async ({ page }) =>
    {
        await page.goto('https://demoqa.com/alerts');
        page.on('dialog', async dialog => 
            {
                //console.log(dialog.type());
                expect(dialog.type()).toEqual('confirm');
                //console.log(dialog.message());
                expect(dialog.message()).toEqual('Do you confirm action?');
                await dialog.accept();
            });
        await page.locator('#confirmButton').click();
        await expect(page.locator('#confirmResult')).toHaveText('You selected Ok');
        
    });
test('Check prompt modal window to have input field and verify message to appear', async ({ page }) =>
    {
        await page.goto('https://demoqa.com/alerts');
        const name ='Andrew';
        page.on('dialog', async dialog => 
            {
                //console.log(dialog.type());
                expect(dialog.type()).toEqual('prompt');
                //console.log(dialog.message());
                expect(dialog.message()).toEqual('Please enter your name');
                await dialog.accept(name);
            });
        await page.locator('#promtButton').click();
        await expect(page.locator('#promptResult')).toHaveText(`You entered ${name}`);
            
    });

test('Check if button 1 is disabled for 5 seconds and then enabled', async ({ page }) => {
        
    await page.goto('https://demoqa.com/dynamic-properties');
    const button = page.locator('#enableAfter');
    await expect(button).toBeDisabled();
    await expect(button).toBeEnabled({timeout: 6000});
});

test('Check if button 2 is not visible for 5 seconds and then visible', async ({ page }) => {
        
    await page.goto('https://demoqa.com/dynamic-properties');
    const button = page.locator('#visibleAfter');
    await expect(button).not.toBeVisible();
    await expect(button).toBeVisible({timeout: 6000});
});
    