const { test, expect } = require("@playwright/test");


exports.WebTablePage = class WebTablePage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page)
    {
        this.page=page;
        this.webTableLocator = page.locator('table[name="BookTable"]');
        this.webTableRowsLocator = this.webTableLocator.locator('tr');
        this.webTableTitles = this.webTableLocator.locator('th');
    };
    async ParseTitlesList()
    {
        const titlesArray = await this.webTableTitles.allTextContents();
        return titlesArray;
    };
    async GetColumnNumber(searchedColumn)
    {
        const titlesArray = await this.webTableTitles.allTextContents();
        const searchedColumnIndex = titlesArray.findIndex(title => title === searchedColumn);
        return searchedColumnIndex;
    }
    async ParseRows()
    {
        const rowsLocator = this.webTableRowsLocator;
        const filteredRows = rowsLocator.filter({has: this.page.locator('td')});
        return filteredRows;
    };

    async ParseColumnByName(columnName)
    {
        const columnIndex = await this.GetColumnNumber(columnName);
        const tableRows = await this.ParseRows();
        const resultColumn = [];
        for (const row of await tableRows.all()) {
            const cellLocator = row.locator(`td:nth-child(${columnIndex+1})`);
            const cellText = await cellLocator.textContent();
            resultColumn.push(cellText);
        }
        return resultColumn;
    };
    // ASSERTIONS
    async CheckCount(expectedCount, elementsList)
    {
        await expect(elementsList).toHaveCount(expectedCount);
    };
    async CheckElementsListToBeEqual(expectedTableHeaders, listOfElems)
    {
        expectedTableHeaders.forEach(elem => { 
         expect(listOfElems).toContain(elem);
        });
    };
    async CheckListNotToContainElement(list,elem)
    {
        expect(list).not.toContain(elem);
    };
};

exports.PaginationPage = class PaginationPage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page)
    {
        this.page=page;
        this.paginatedTableLocator = page.locator("#productTable");
        this.pagesNumbersList = page.locator('.pagination li');
    }
    async ParseRows()
    {
        const rowsLocator = this.paginatedTableLocator;
        const filteredRows = await rowsLocator.locator('tr');
        return filteredRows;
    };
    async GetProductByName(productName)
    {
        const productRows = await this.paginatedTableLocator.locator('tbody tr').allTextContents();
        const rowIndex = productRows.findIndex(row => row.includes(productName));
        return rowIndex !== -1 ? rowIndex : null;
    };
    async ClickOnPageNumber(number)
    {
        await this.pagesNumbersList.getByText(number).click();
    };
    
    async GetPagesTotalNumber()
    {
        const pagesTotalNumber = await this.pagesNumbersList.count();
        return pagesTotalNumber;
    };

    async ClickOnProductCheckbox(searchedRowIndex)
    {
        const searchedCheckbox = await this.paginatedTableLocator.locator('input[type="checkbox"]').nth(searchedRowIndex);
        await searchedCheckbox.check();
        return searchedCheckbox;
    };

    async GetIDs()
    {
        const ids = await this.paginatedTableLocator.locator('tbody tr td:first-child').allTextContents();
        return ids;
    };

    // ASERTIONS 
    async AssertCheckboxToBeChecked(checkbox)
    {
        await expect(checkbox).toBeChecked();
    };
    
    async CheckProductToExist(searchedRowIndex)
    {
        await expect(searchedRowIndex,'Product not found').not.toBe(undefined);
    };

    async CheckElementsListToBeEqual(expectedTableHeaders, listOfElems)
    {
        expectedTableHeaders.forEach(elem => { 
         expect(listOfElems).toContain(elem);
        });
    };
};