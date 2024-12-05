const { test, expect } = require("@playwright/test");

exports.WebTablePage = class WebTablePage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page, tableLocator)
    {
        this.page=page;
        this.webTableLocator = tableLocator;
        this.webTableTitles = this.webTableLocator.locator('th');
    };
    async parseTitles()
    {
        const titlesArray = await this.webTableTitles.allTextContents();
        return titlesArray;
    };
    async parseRows()
    {
        const rowsLocator = this.webTableLocator;
        const filteredRows = rowsLocator.filter({has: this.page.locator('td')});
        return filteredRows;
    };
    //TODO - Transfer colmun name instead of index
    async parseColumn(columnIndex)
    {
        const tableRows = await this.parseRows();
        const resultColumn = [];
        for (const row of await tableRows.all()) {
            const cellLocator = row.locator(`td:nth-child(${columnIndex+1})`);
            const cellText = await cellLocator.textContent();
            resultColumn.push(cellText);
        }
        return resultColumn;
    };
    // ASSERTIONS
    async checkCount(expectedCount, elementsList)
    {
        await expect(elementsList).toHaveCount(expectedCount);
    };
    async checkElemListToBeEqual(expectedTableHeaders, listOfElems)
    {
        expectedTableHeaders.forEach(elem => { 
            expect(listOfElems).toContain(elem);
        });
    };
    async checkListNotToContainElem(list,elem)
    {
        expect(list).not.toContain(elem);
    };
};

exports.PaginationPage = class PaginationPage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page, tableLocator)
    {
        this.page=page;
        this.paginatedTableLocator = tableLocator;
        this.pagesNumbersList = page.locator('.pagination li');
        /*this.paginatedTableProductRows = page.locator('tbody tr');
        this.paginatedTablePageNumberButton = page.locator('.pagination li a');
        this.paginatedTableIdColumn = page.locator('#productTable tbody tr td:first-child');
        this.paginatedTablePageNumberButtonText = page.locator('.pagination li');
        this.paginatedTableCheckboxes = page.locator('#productTable input[type="checkbox"]');
        this.row = page.locator('#productTable td');*/
    }
    async parseRows()
    {
        const rowsLocator = this.paginatedTableLocator;
        const filteredRows = await rowsLocator.locator('tr');
        return filteredRows;
    };
    async findProduct(productName)
    {
        const productRows = await this.paginatedTableLocator.locator('tbody tr').allTextContents();
        //TODO Use filter instead of loop statement
        for (const elem in productRows)
        {
            if(productRows[elem].includes(productName))
            { 
                return elem;
            }
        }
        return null;
    };
    async clickOnPageNumber(number)
    {
        await this.pagesNumbersList.getByText(number).click();
    };
    
    async findPagesTotalNumber()
    {
        const pagesTotalNumber = await this.pagesNumbersList.count();
        return pagesTotalNumber;
    };

    async clickOnProductCheckbox(searchedRowIndex)
    {
        const searchedCheckbox = await this.paginatedTableLocator.locator('input[type="checkbox"]').nth(searchedRowIndex);
        await searchedCheckbox.check();
        return searchedCheckbox;
    };

    async returnIDs()
    {
        const ids = await this.paginatedTableLocator.locator('tbody tr td:first-child').allTextContents();
        return ids;
    };

    // ASERTIONS 
    async AssertCheckboxToBeChecked(checkbox)
    {
        await expect(checkbox).toBeChecked();
    }
};