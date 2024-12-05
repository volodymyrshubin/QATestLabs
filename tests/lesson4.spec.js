const { test, expect } = require('@playwright/test');


//TODO
test('Check that Group 1, option 2 is selected', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
  
    // Click to open the dropdown
    await page.locator('#withOptGroup').click();
  
    // Select the option "Group 1, option 2"
    await page.getByText('Group 1, option 2').click();
    
    // Verify that "Group 1, option 2" is displayed as the selected value
    //TODO Use xpath to move to the lower level
    const selectedValue = await page.locator("//*[@id='withOptGroup']/div/div[1]/div[1]").textContent();

    expect(selectedValue).toBe('Group 1, option 2');
});


test('Check that Prof is selected', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
  
    // Click to open the dropdown
    await page.locator('#selectOne').click();

    const dropdownProf = page.locator('#selectOne');
  
    // Select the option "Prof."
    await page.getByText('Prof.').click();
    
    // Verify that "Prof." is displayed as the selected value
    const selectedValue = await dropdownProf.locator('.css-1uccc91-singleValue').textContent();
    expect(selectedValue).toBe('Prof.');
});

test('Verify Old Style Select Menu', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
  
    // Select options
    //Green
    await page.locator('#oldSelectMenu').selectOption( {value : '2'});
    //Red
    await page.locator('#oldSelectMenu').selectOption( {label : 'Red'});
    //Blue
    await page.locator('#oldSelectMenu').selectOption( {index : 1 });
  
    //The blue is selected
    const selectedValue = await page.locator('#oldSelectMenu').inputValue();
    await expect(selectedValue).toBe('1');

    //Check number of options equals 11
    const options = await page.locator('#oldSelectMenu option');
    await expect(options).toHaveCount(11);

    //Check Yellow presence in the dropdown
    const content = await page.locator('#oldSelectMenu').textContent();
    await expect(content.includes('Yellow')).toBeTruthy();

});

//TODO Rewrite using click() and id as locators - DONE
test("Multi-select dropdown - select and verify options", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/select-menu");

    const multiDropdown = page.getByText("Multiselect drop down").locator("xpath=../../div"); 
    await multiDropdown.click();

    //const dropdownHTML = await multiDropdown.evaluate(el => el.outerHTML); this is a way how output found html by locator
    //console.log(dropdownHTML);

    const colorsList = multiDropdown.locator(".css-26l3qy-menu");
    await colorsList.getByText("Green").click();
    await colorsList.getByText("Red").click();
    await colorsList.locator("#react-select-4-option-1").click(); // Blue color

    const expectedColors = ["Green", "Red", "Blue"];
    const selectedOptions = await page.locator('.css-1rhbuit-multiValue').allTextContents();

    expect(selectedOptions).toEqual(expectedColors) // check same ordering

    expectedColors.forEach(color => { // without ordering
      expect(selectedOptions).toContain(color);
    });
  });

//TODO Use keyword cmd to unselect elements -DONE
test('Standard multi-select - select and verify options', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');

   
    await page.selectOption('#cars', ['volvo','saab','opel','audi']);
    //await page.selectOption('#cars', ['volvo', 'saab', 'opel']);
    
    await page.locator('#cars option[value="audi"]').click({
        modifiers: ['Meta']
    });



    const selectedOptions = await page.locator('#cars option:checked').allTextContents();
    
    //TODO use loop - DONE
    /*expect(selectedOptions).toContain('Volvo');
    expect(selectedOptions).toContain('Saab');
    expect(selectedOptions).toContain('Opel');*/

    const expectedOptions = ['Volvo', 'Saab', 'Opel'];    
    for (const option of expectedOptions) {
        expect(selectedOptions).toContain(option);
    }

    
    expect(selectedOptions.length).toBe(expectedOptions.length);


});






