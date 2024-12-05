const {test , expect} = require('playwright/test');


test('Verify output to appear with input data', async ({ page }) => {
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
    

    //output is visible
    await expect(page.locator('#output')).toBeVisible();

    //fields to have correct input data
    await expect(page.locator('#output #name')).toHaveText('Name:John');
    await expect(page.locator('#output #email')).toHaveText('Email:johntest@gmail.com');
    await expect(page.locator('#output #currentAddress')).toHaveText('Current Address :currentTestAddress');
    await expect(page.locator('#output #permanentAddress')).toHaveText('Permananet Address :permanentTestAddress');

   


  });

  test('Verify full name and email inputs exists', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
  

    // username field to be visible
    const fullName = await page.locator('#userName-wrapper > div.col-md-9.col-sm-12');
    const fullNameField = await fullName.locator('input[type="text"]');
    await expect(fullNameField).toBeVisible();
    
  
    // find email
    const emailInput = await page.locator('//*[@id="userEmail-label"]/../../div[2]/input');



    // input to be visible
    await expect(emailInput).toBeVisible();

   
  });


//TODO Rewrite using ids - DONE
test('Radio button test', async ({ page }) => {
  await page.goto('https://demoqa.com/radio-button');

  // Click on Yes label associated with the Yes button
  await page.locator('label[for="yesRadio"]').click();

  // Yes button to be checked
  await expect(page.locator('#yesRadio')).toBeChecked();

  // Check that Yes text appears
  await expect(page.locator('p.mt-3')).toHaveText('You have selected Yes');

  // Click on Impressive label associated with the Impressive button
  await page.locator('label[for="impressiveRadio"]').click();

  // Check that Impressive button is selected
  await expect(page.locator('#impressiveRadio')).toBeChecked();

  // Check that Yes button is no longer selected
  await expect(page.locator('#yesRadio')).not.toBeChecked();

  // Check that the message appears
  await expect(page.locator('p.mt-3')).toHaveText('You have selected Impressive');

  // Check that No button is always disabled
  await expect(page.locator('#noRadio')).toBeDisabled();
});


//TODO Rewrite in the verse order - DONE
test('Checkbox test', async ({ page }) => {
  await page.goto('https://demoqa.com/checkbox');

  // Expand the Home dropdown
  await page.locator('//label[@for="tree-node-home"]//preceding-sibling::button[@title="Toggle"]').click();

  // Expand the Documents dropdown under Home
  await page.locator('//label[@for="tree-node-documents"]//preceding-sibling::button[@title="Toggle"]').click();

  // Expand the Office dropdown under Documents
  await page.locator('//label[@for="tree-node-office"]//preceding-sibling::button[@title="Toggle"]').click();

  // Click on Public checkbox
  await page.locator('//label[@for="tree-node-public"]/span[@class="rct-checkbox"]').click();

  // Click on Home checkbox
  await page.locator('//label[@for="tree-node-home"]/span[@class="rct-checkbox"]').check();

  //TODO Write loop - DONE
  // Wait for all checkboxes to become checked
  const checkboxLabels = ['home', 'documents', 'office', 'public'];

  // Check if checkboxes are checked
  for (const label of checkboxLabels) {
    const checkbox = await page.locator(`//label[@for="tree-node-${label}"]/span[@class="rct-checkbox"]`).isChecked();
    //await expect(checkbox).toBeChecked(); 
    console.log(checkbox);
  }


});







