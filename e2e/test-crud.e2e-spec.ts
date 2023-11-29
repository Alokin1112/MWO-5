const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');

describe('Login Test', () => {


  before(async () => {
    const chromeOptions = new chrome.Options().headless();

    driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
  });

  after(async () => {
    // Quit the WebDriver session after tests
    await driver.quit();
  });

  it('should log in with valid credentials', async () => {
    let driver;
    // Navigate to the login page
    await driver.get('http://localhost:4200');

    // Fill in the username and password fields
    await driver.findElement(By.id('username_input')).sendKeys('admin');
    await driver.findElement(By.id('password_input')).sendKeys('admin');

    // Submit the form
    await driver.findElement(By.id('submit_input')).click();

    // Wait for the login to complete (replace with an appropriate condition)
    await driver.wait(until.urlIs("http://localhost:4200/home"), 5000);

    // Assert that the login was successful (replace with an appropriate condition/assertion)
    const isLoggedIn = await driver.findElement(By.className("subtitle")).isDisplayed();
    expect(isLoggedIn).to.be.true;
  });

});