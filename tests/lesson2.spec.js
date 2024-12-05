const {test , expect} = require('playwright/test');


// id css selector used
test('Verify Submit button (id)', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
  

    // fill username field
    await page.locator('#userName').fill('John');

    // fill email field
    await page.locator('#userEmail').fill('johntest@gmail.com');

    // fill current adress field
    await page.locator('#currentAddress').fill('currentTestAddress');
    
    // fill permanent address field
    await page.locator('#permanentAddress').fill('permanentTestAddress');

    // click on Submit
    
    await page.locator('#submit').click();
    //await page.click('button:has-text("Submit")');



  });

  // placeholder css selector used
test('Verify Submit button  (placeholder)', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');


  // fill username field
  await page.locator('input[placeholder="Full Name"]').fill('John');

  // fill email field
  await page.locator('input[placeholder="name@example.com"]').fill('johntest@gmail.com');

  // fill current adress field

  // error
  await page.locator('textarea[placeholder="Current Address"]').fill('currentTestAddress');
  //await page.locator('#currentAddress').fill('currentTestAddress');
  // fill permanent address field
  await page.locator('#permanentAddress').fill('permanentTestAddress');

  // click on Submit
  
  await page.locator('button:has-text("Submit")').click();
  


});

// type css selector used

test('Verify Submit button (type)', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

 // fill username field
  const usernameField = await page.locator('#userName-wrapper > div.col-md-9.col-sm-12');
  await usernameField.locator('input[type="text"]').fill('John');

  // fill email field
  await page.locator('input[placeholder="name@example.com"]').fill('johntest@gmail.com');

  // fill the Current Address field (textarea with id currentAddress)
  await page.locator('textarea[id="currentAddress"]').fill('currentTestAddress');

  // fill the Permanent Address field (textarea with id permanentAddress)
  await page.locator('textarea[id="permanentAddress"]').fill('permanentTestAddress');

  // click on Submit
  
  await page.locator('button[id="submit"]').click();
});

test('Verify Submit button(button type locators)', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');


  // fill username field
  await page.locator('#userName').fill('John');

  // fill email field
  await page.locator('#userEmail').fill('johntest@gmail.com');

  // fill current adress field
  await page.locator('#currentAddress').fill('currentTestAddress');
  
  // fill permanent address field
  await page.locator('#permanentAddress').fill('permanentTestAddress');

  let textContainer= await page.locator('#app > div > div > div > div.col-12.mt-4.col-md-6 > div.text-field-container');

  // click on Submit
  
  await textContainer.locator('button[type="button"]').click();
  



});

// xpath 

test('Verify Submit button (xpath)', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');


  // fill username field
  await page.locator('//*[@id="userName"]').fill('John');

  // fill email field
  await page.locator('//*[@id="userEmail"]').fill('johntest@gmail.com');

  // fill current adress field
  await page.locator('//*[@id="currentAddress"]').fill('currentTestAddress');
  
  // fill permanent address field
  await page.locator('//*[@id="permanentAddress"]').fill('permanentTestAddress');

  // click on Submit
  
  await page.locator('//*[@id="submit"]').click();
 



});


//page.getByRole(), page.getByText(), page.getByLabel(), page.getByPlaceholder()

test('Verify Submit button test', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');


  // fill username field
  await page.getByPlaceholder('Full Name').fill('John');

  // fill email field
  await page.getByPlaceholder('name@example.com').fill('johntest@gmail.com');

  // fill current adress field
  await page.getByPlaceholder('Current Address').fill('currentTestAddress');
  
  // fill permanent address field
  
  await page.locator('#permanentAddress').fill('permanentTestAddress');

  // click on Submit
  
  await page.getByText('Submit').click();
  //await page.getByRole('button', {name :'Submit'}).click();
  



});

test('Verify that Permanent Address input area has title', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');


  // fill username field
  await expect(page.getByLabel('Permanent Address')).toBeVisible();
  

});

