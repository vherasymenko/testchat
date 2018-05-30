const capabilities = require('./capabilities');

const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

async function example(element){
    const driver = new webdriver.Builder()
    // .forBrowser(browser)
    .usingServer('http://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(element)
    .build();
    try {
        await driver.get('https://www.google.com');
        await driver.findElement(By.name('q')).sendKeys('Webdriver');
        await driver.findElement(By.name('q')).submit();
        const results = await driver.findElements(By.className('g'));
        console.log(element.browserName + 'results is: ' + results.length);
        await driver.sleep(3000);
    } finally {
        driver.quit();
    }
};

capabilities.map(element => {
    example(element);
});