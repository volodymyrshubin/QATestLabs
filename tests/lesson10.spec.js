const { test, expect } = require('@playwright/test');
const { assert } = require('console');

test('Verify that drop changes text and color', async ({ page }) =>
    {
        await page.goto('https://demoqa.com/droppable');
        const simpleContainer = page.locator('#simpleDropContainer');
        await simpleContainer.locator('#draggable').dragTo(simpleContainer.locator('#droppable'));
        await expect(simpleContainer.locator('#droppable')).toHaveCSS(
            "background-color",
            "rgb(70, 130, 180)"
        );
        await expect(simpleContainer.locator('#droppable')).toHaveText('Dropped!');
    
    });

test('Move Six to the top and verify order', async ({ page }) =>
{
    await page.goto('https://demoqa.com/sortable');
    const listTab = page.locator('.vertical-list-container');
    const sixOption = listTab.getByText('Six');
    const oneOption = listTab.getByText('One');
    await sixOption.dragTo(oneOption);
    const expectedList = ['Six', 'One', 'Two', 'Three', 'Four', 'Five'];
    const selectedList = await listTab.locator('.list-group-item').allInnerTexts();
    //console.log(selectedList);
    expect(selectedList).toEqual(expectedList);
    
});