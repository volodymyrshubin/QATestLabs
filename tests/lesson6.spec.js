//import { WebTablePage, PaginationPage } from '../pages/pages.js';
const { WebTablePage, PaginationPage } = require("../pages/pages.js");
const { test, expect } = require("@playwright/test");
const { describe } = require("node:test");

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/2018/09/automation-form.html"
  );
});

test.afterEach(async ({ page }) => {
  //await page.close();
});

test.describe("Web Table@webtable", () => {
  const expectedTitles = [
    {
      expected: ["BookName", "Author", "Subject", "Price"],
    },
  ];
  const authorsList = [
    {
      expected: ["Amit", "Mukesh", "Animesh", "Mukesh", "Amod", "Amit"],
    },
  ];
  const negativeTestData = [
    {
      expectedBookName: "Master In Golang"
    },
    {
      expectedBookName: "Master In Python"
    }
  ];
  expectedTitles.forEach(({ expected }) => {
    test(`Check All Titles of the Table@test1`, async ({ page }) => {
      const webTable = new WebTablePage(
        page,
        //TODO Move locators to pages file
        page.locator('table[name="BookTable"] tr')
      );
      const titlesArray = await webTable.parseTitles();
      await webTable.checkElemListToBeEqual(expectedBookName, titlesArray);
    });
  });

  test("Check the count of the rows@test2", async ({ page }) => {
    const webTable = new WebTablePage(
      page,
      page.locator('table[name="BookTable"] tr')
    );
    const filteredRows = await webTable.parseRows();
    await webTable.checkCount(6, filteredRows);
  });
  authorsList.forEach(({ expected }) => {
    test("Check all authors@test3", async ({ page }) => {
      const webTable = new WebTablePage(
        page,
        page.locator('table[name="BookTable"] tr')
      );
      const authorsList = await webTable.parseColumn(1);
      await webTable.checkElemListToBeEqual(expected, authorsList);
    });
  });
  negativeTestData.forEach(({ expectedBookName }) => {
    test(`Check BookName column not to contain Master in Python${expectedBookName}@test4`, async ({
      page,
    }) => {
      const webTable = new WebTablePage(
        page,
        page.locator('table[name="BookTable"] tr')
      );
      const booksList = await webTable.parseColumn(0);
      await webTable.checkListNotToContainElem(booksList, expectedBookName);
    });
  });
});

test.describe("Paginated Table@paginatedtable", () => {
  //only, fail, skip, fixme, slow
  test("Check that Product 4 is selected@test1", async ({ page }) => {
    let paginatedTable = new PaginationPage(
      page,
      page.locator("#productTable")
    );
    await paginatedTable.clickOnPageNumber("1");
    await page.waitForSelector("#productTable tbody tr");
    const searchedRowIndex = await paginatedTable.findProduct("Test");
    //TODO Use assertion
    if (!searchedRowIndex) {
      throw new Error("Row with product name not found.");
    }
    await paginatedTable.AssertCheckboxToBeChecked(
      await paginatedTable.clickOnProductCheckbox(searchedRowIndex)
    );
  });

  //comment
  test('Check that "Television" and "Smartwatch" checkboxes are selected@test2', async ({
    page,
  }) => {
    const paginatedTable = new PaginationPage(
      page,
      page.locator("#productTable")
    );
    const pagesTotalNumber = await paginatedTable.findPagesTotalNumber();
    const productsToCheck = ["Television", "Action Camera"];
    const checkedProducts = new Set();
    for (let pageNumber = 1; pageNumber <= pagesTotalNumber; pageNumber++) {
      await paginatedTable.clickOnPageNumber(pageNumber);
      await page.waitForSelector("#productTable tbody tr");
      for (const productName of productsToCheck) {
        if (checkedProducts.has(productName)) continue;
        const searchedRowIndex = await paginatedTable.findProduct(productName);
        if (searchedRowIndex !== null) {
          const checkbox = await paginatedTable.clickOnProductCheckbox(
            searchedRowIndex
          );
          await paginatedTable.AssertCheckboxToBeChecked(checkbox);
          checkedProducts.add(productName);
        }
      }
      if (checkedProducts.size === productsToCheck.length) break;
    }
    expect(checkedProducts.size).toBe(productsToCheck.length);
  });

  /*test('Check that Ids on the 3rd page@test3', async ({ page }) =>
        {
            await page.locator('.pagination li a').nth(2).click();
            //await page.click('.pagination >> text=3');
            await page.waitForSelector('#productTable tbody tr');
            const ids = await page.locator('#productTable tbody tr td:first-child').allTextContents();
            console.log(ids);
            const expectedIds = ["11", "12", "13", "14", "15"];
            expect(ids).toEqual(expectedIds);                
        });*/
});

test.describe("Check IDs on the each page", () => {
  const positiveTestData = [
    { number: "1", expected: ["1", "2", "3", "4", "5"] },
    { number: "2", expected: ["6", "7", "8", "9", "10"] },
    { number: "3", expected: ["11", "12", "13", "14", "15"] },
    { number: "4", expected: ["16", "17", "18", "19", "20"] },
  ];
  /*const negativeTestData = [
            { number: '1', expected: ['1','2','3','4','5'] },
            { number: '2', expected: ['6','7','8','9','10'] },
            { number: '3', expected: ['11','12','13','14','17'] },
            { number: '4', expected: ['16','17','18','19','20'] },
        ];*/

  positiveTestData.forEach(({ number, expected }) => {
    test(`Check IDs on the page: ${number}`, async ({ page }) => {
      const paginatedTable = new PaginationPage(
        page,
        page.locator("#productTable")
      );
      const webTable = new WebTablePage(page, page.locator("#productTable"));
      //const pageNumber = page.locator('#pagination li').getByText(number);
      await paginatedTable.clickOnPageNumber(number);
      await page.waitForSelector("#productTable tbody tr");
      //const ids = await paginatedTable.returnIDs();
      const ids = await paginatedTable.returnIDs();
      console.log(ids);
      await webTable.checkElemListToBeEqual(expected, ids);
    });
  });

  /*negativeTestData.forEach(({number, expected}) => {
            test(`Check IDs on the page - negative test: ${number}`, async ({ page }) => {
                const pageNumber = page.locator('#pagination li').getByText(number);
                await pageNumber.click();
                await page.waitForSelector('#productTable tbody tr');
                const ids = await page.locator('#productTable tbody tr td:first-child').allTextContents();
                //console.log(ids);
                expect(ids, `Expected column ${expected}`).toEqual(expected); 
            });
        });*/
});
