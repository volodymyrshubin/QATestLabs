const { WebTablePage, PaginationPage } = require("../pages/pages.js");
const { test, expect } = require("@playwright/test");


test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/2018/09/automation-form.html"
  );
});

test.afterEach(async ({ page }) => {
  //await page.close();
});

test.describe("Web Table@webtable", () => {
  const expectedBookTitles = [
    {
      expectedTitlesList: ["BookName", "Author", "Subject", "Price"],
    },
  ];
  const authorsList = [
    {
      expectedAuthorsList: ["Amit", "Mukesh", "Animesh", "Mukesh", "Amod", "Amit"],
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
  expectedBookTitles.forEach(({ expectedTitlesList }) => {
    test(`Check All Titles of the Table@test1`, async ({ page }) => {
      const webTable = new WebTablePage(
        page
      );
      const titlesArray = await webTable.ParseTitlesList();
      await webTable.CheckElementsListToBeEqual(expectedTitlesList, titlesArray);
    });
  });

  test("Check the count of the rows@test2", async ({ page }) => {
    const webTable = new WebTablePage(
      page
    );
    const filteredRows = await webTable.ParseRows();
    await webTable.CheckCount(6, filteredRows);
  });
  authorsList.forEach(({ expectedAuthorsList }) => {
    test("Check all authors@test3", async ({ page }) => {
      const webTable = new WebTablePage(
        page
      );
      const authorsList = await webTable.ParseColumnByName('Author');
      await webTable.CheckElementsListToBeEqual(expectedAuthorsList, authorsList);
    });
  });
  negativeTestData.forEach(({ expectedBookName }) => {
    test(`Check BookName column not to contain Master in Python${expectedBookName}@test4`, async ({
      page,
    }) => {
      const webTable = new WebTablePage(
        page
      );
      const booksList = await webTable.ParseColumnByName('BookName');
      await webTable.CheckListNotToContainElement(booksList, expectedBookName);
    });
  });
});

test.describe("Paginated Table@paginatedtable", () => {
  const productList = 
  [
    { pageNumber:'1', productName:'Smartwatch'},
    { pageNumber:'3', productName:'Router'}
  ]
  productList.forEach(({ pageNumber, productName }) => {
  test(`Check that Product ${productName} is selected@test1`, async ({ page }) => {
    let paginatedTable = new PaginationPage(
      page
    );
    await paginatedTable.ClickOnPageNumber(pageNumber);
    await page.waitForSelector("#productTable tbody tr");
    const searchedRowIndex = await paginatedTable.GetProductByName(productName);
    await paginatedTable.CheckProductToExist(searchedRowIndex);
    await paginatedTable.AssertCheckboxToBeChecked(
      await paginatedTable.ClickOnProductCheckbox(searchedRowIndex)
    );
  });
});

  test('Check that "Television" and "Smartwatch" checkboxes are selected@test2', async ({
    page,
  }) => {
    const paginatedTable = new PaginationPage(
      page
    );
    const pagesTotalNumber = await paginatedTable.GetPagesTotalNumber();
    const productsToCheck = ["Television", "Action Camera"];
    const checkedProducts = new Set();
    for (let pageNumber = 1; pageNumber <= pagesTotalNumber; pageNumber++) {
      await paginatedTable.ClickOnPageNumber(pageNumber);
      await page.waitForSelector("#productTable tbody tr");
      for (const productName of productsToCheck) {
        if (checkedProducts.has(productName)) continue;
        const searchedRowIndex = await paginatedTable.GetProductByName(productName);
        if (searchedRowIndex !== null) {
          const checkbox = await paginatedTable.ClickOnProductCheckbox(
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
});

test.describe("Check IDs on the each page", () => {
  const positiveTestData = [
    { pageNumber: "1", expectedIDsList: ["1", "2", "3", "4", "5"] },
    { pageNumber: "2", expectedIDsList: ["6", "7", "8", "9", "10"] },
    { pageNumber: "3", expectedIDsList: ["11", "12", "13", "14", "15"] },
    { pageNumber: "4", expectedIDsList: ["16", "17", "18", "19", "20"] },
  ];
  positiveTestData.forEach(({ pageNumber, expectedIDsList }) => {
    test(`Check IDs on the page: ${pageNumber}`, async ({ page }) => {
      const paginatedTable = new PaginationPage(
        page
      );
      await paginatedTable.ClickOnPageNumber(pageNumber);
      await page.waitForSelector("#productTable tbody tr");
      const ids = await paginatedTable.GetIDs();
      await paginatedTable.CheckElementsListToBeEqual(expectedIDsList, ids);
    });
  });
});
