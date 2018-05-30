const puppeteer = require('puppeteer');

const URL = 'https://www.google.com';
let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.goto(URL);    
    await page.setViewport({width, height});
});

afterAll(() => {
    browser.close();
})

describe("Check opening google page", () => {
    test('Check title of the page: ', async() => {
        const html = await page.$eval('title', e => e.innerHTML);

        expect(html).toBe('Google');
    })
})

test('Check searching results:', async() => {
    const searchQuery = 'TechMagic';
    const title = 'TechMagic - Google Search';

    await page.type('#lst-ib', searchQuery);
    await page.keyboard.press('Enter');

    await page.waitForSelector('div.g');
    const pageTitleSelector = await page.$eval('title', e => e.innerHTML);
    expect(pageTitleSelector).toBe(title);

    const gResult = await page.$$('div.g');
    expect(gResult.lenght).toBe(gResult.lenght);

})