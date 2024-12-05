const { test, expect } = require('@playwright/test');

test('Find Frame1 and verify input', async ({ page }) =>
    {
        await page.goto('https://ui.vision/demo/webtest/frames/');
        const frame1 = page.frame({url: `https://ui.vision/demo/webtest/frames/frame_1.html`});
        //TODO - чим відрізняється frame i framelocator
        //console.log(typeof frame1);
        await frame1.fill('input[type="text"]','test1');
        await expect(frame1.locator('input[type="text"]')).toHaveValue('test1'); 
    
    });

test('Find Frame2 and verify input', async ({ page }) =>
    {
        await page.goto('https://ui.vision/demo/webtest/frames/');
        const input1 = page.frameLocator('[src="frame_2.html"]').locator('input[type="text"]');
        //console.log(typeof input1);
        await input1.fill('test1');
        await expect(input1).toHaveValue('test1'); 
    
    });
test('Fill out frame3 and verify input', async ({ page }) =>
    {
        await page.goto('https://ui.vision/demo/webtest/frames/');
        const gForm = page.frame({url: `https://ui.vision/demo/webtest/frames/frame_3.html`}).childFrames()[0];
        //console.log(gForm);
        const button1 = gForm.locator('#i6');
        await button1.click();
        const button1State = await button1.getAttribute('aria-checked');
        //console.log(button1State);
        expect(button1State).toBeTruthy();
        const button2 = gForm.locator('#i21');
        await button2.click();
        const button2State = await button2.getAttribute('aria-checked');
        //console.log(button2State);
        expect(button2State).toBeTruthy();
        await gForm.getByRole('listbox').click();
        const option3 = gForm.locator('//*[@id="mG61Hd"]/div[2]/div[1]/div[2]/div[3]/div/div/div[2]/div/div[2]/div[3]');
        await option3.click();
        const option3State = await gForm.locator('//*[@id="mG61Hd"]/div[2]/div[1]/div[2]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[3]').getAttribute('aria-selected');
        //console.log(option3State);
        expect(option3State).toBeTruthy();
        const button4 = gForm.locator('//*[@id="mG61Hd"]/div[2]/div[1]/div[3]/div[1]/div[1]/div/span/span');
        //const button4 = gForm.locator('.NPEfkd').and(gForm.locator('.RveJvd').and(gForm.locator('.snByac')));
        await button4.click();
        const input1 = gForm.locator('input[type="text"]');
        await input1.fill('short text');
        expect(input1).toHaveValue('short text');
        const input2 = gForm.locator('textarea[jsname="YPqjbf"]');
        await input2.fill('long text');
        expect(input2).toHaveValue('long text');
       
        
        
    });
    
