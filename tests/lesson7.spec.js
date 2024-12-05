import { currentDate, currentDateAndTime } from './functions.js';
const { test, expect } = require('@playwright/test');


test('Check current date', async ({ page }) =>
    {
        await page.goto('https://demoqa.com/date-picker');
        const date = await page.locator('#datePickerMonthYearInput').inputValue();
        expect(date).toEqual(currentDate());
        //console.log(date);
    
    });

test('Check current date and time', async ({ page }) =>
    {
        await page.goto('https://demoqa.com/date-picker');
        const date = await page.locator('#dateAndTimePickerInput').inputValue();
        //console.log(currentDateAndTime());
        expect(date).toEqual(currentDateAndTime());
        
    });

test('Check input date to be correctly selected', async ({ page }) =>
    {
        await page.goto('https://demoqa.com/date-picker');
        const inputDate = '12/23/2024';
        await page.locator('#datePickerMonthYearInput').fill(inputDate);
        const selectedMonthIndex = parseInt(await page.locator('.react-datepicker__month-select').inputValue())+1;
        const selectedMonth = (selectedMonthIndex).toLocaleString('en-US',{
            minimumIntegerDigits: 2
        });
        //console.log(selectedMonth); 
        const selectedYear = await page.locator('.react-datepicker__year-select').inputValue();
        //console.log(selectedYear); 
        const selectedDay = await page.locator('.react-datepicker__day[tabindex="0"]').textContent();
        //console.log(selectedDay);
        const selectedDate = `${selectedMonth}/${selectedDay}/${selectedYear}`;
        expect(selectedDate).toEqual(inputDate);
        
    });

//TODO - Add parametrized test 
test('Check selected date to have correct input text', async ({ page }) =>
    {
        await page.goto('https://demoqa.com/date-picker');
        //2 August 2018
        const expectedInputDate = '08/02/2018';
        await page.locator('#datePickerMonthYearInput').click();
        await page.selectOption('.react-datepicker__month-select','August');
        await page.selectOption('.react-datepicker__year-select','2018');
        //react-datepicker__week
        await page.locator('.react-datepicker__week').getByText('2',{exact: true}).first().click();
        //await page.locator('.react-datepicker__day--002:not(.react-datepicker__day--outside-month)').click();
        const setValue = await page.locator('#datePickerMonthYearInput').inputValue();
        //console.log(setValue);
        expect(setValue).toEqual(expectedInputDate);

    });

test.describe('Check dates to be selected', () =>
    {
        
        const positiveTestData = [
            { day: '1', month: 'July', year: '2018', expectedDate: '07/01/2018' },
            { day: '2', month: 'June', year: '2021', expectedDate: '06/02/2021' },
            { day: '4', month: 'May', year: '2016', expectedDate: '05/04/2016' }
        ];
        
        
        positiveTestData.forEach(({day, month, year, expectedDate}) => {
            test.beforeEach(async ({ page }) => {
                await page.goto('https://demoqa.com/date-picker');
            });
            test(`Check day: ${day}, month: ${month}, year: ${year} to be selected`, async ({ page }) => {
                await page.locator('#datePickerMonthYearInput').click();
                await page.selectOption('.react-datepicker__month-select', month);
                await page.selectOption('.react-datepicker__year-select', year);
                await page.locator('.react-datepicker__week').getByText(day, {exact: true}).first().click();
                //await page.locator('.react-datepicker__day--002:not(.react-datepicker__day--outside-month)').click();
                const setValue = await page.locator('#datePickerMonthYearInput').inputValue();
                //console.log(setValue);
                expect(setValue).toEqual(expectedDate); 
            });
        });
    
    });

