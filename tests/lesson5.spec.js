const { test, expect } = require('@playwright/test');


test('Single Color Input', async ({ page }) => {
    await page.goto('https://demoqa.com/auto-complete');

    const singleColorInput = page.locator('#autoCompleteSingleContainer > div');

    await singleColorInput.click();
    
    await page.keyboard.type('gr');
    
    await singleColorInput.locator('#react-select-3-option-0').click();
    
    await expect(singleColorInput).toHaveText('Green');
});

test('Multiple Color Input', async ({ page }) => {

    await page.goto('https://demoqa.com/auto-complete');

    const multipleColorInput = page.locator('#autoCompleteMultipleContainer > div');

    await multipleColorInput.click();
    
    await page.keyboard.type('re');
    
    await expect(multipleColorInput.locator('div.auto-complete__option:has-text("Red")')).toBeVisible();
    await expect(multipleColorInput.locator('div.auto-complete__option:has-text("Green")')).toBeVisible();
    
    await multipleColorInput.locator('#react-select-2-option-0').click();
    
    //await expect(multipleColorInput).toHaveText('Red');
    
   
    await multipleColorInput.click();
    
    
    await page.keyboard.type('bl');
    
    
    await multipleColorInput.locator('#react-select-2-option-1').click();
    
    //TODO Compare 2 arrays, check the output 45 string - DONE
    const colorsArray = await multipleColorInput.locator('.auto-complete__multi-value__label').allInnerTexts();
    //console.log(colorsArray);
    const colorsArrayExpected = ['Red','Black'];

    //expect(colorsArray).toEqual(colorsArrayExpected);

    //console.log(colorsArrayExpected);
    for (let color of colorsArray)
    {
        await expect(colorsArrayExpected).toContain(color)
    };

});


