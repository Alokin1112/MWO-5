const { Builder, By, Key, until, error } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const { Select } = require('selenium-webdriver/lib/select');

const throwError = async (driver, message) => {
  await driver.quit();
  throw error(message);
};

const getDriver = async () => {
  let driver;
  const chromeOptions = new chrome.Options().headless();

  driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
  await driver.get('http://localhost:4200');
  await driver.findElement(By.id('username_input')).sendKeys('admin');
  await driver.findElement(By.id('password_input')).sendKeys('admin');

  await driver.findElement(By.id('submit_input')).click();
  return driver;
};

const login = async () => {
  let driver = await getDriver();

  // Wait for the login to complete (replace with an appropriate condition)
  await driver.wait(until.urlIs("http://localhost:4200/home"), 5000);


  // Assert that the login was successful (replace with an appropriate condition/assertion)
  const isLoggedIn = await driver.findElement(By.className("subtitle")).isDisplayed();
  if (!isLoggedIn) throwError(driver, "Failed to login");
  await driver.quit();
};


const addItem = async () => {
  let driver = await getDriver();

  await driver.findElement(By.id('add__button')).click();
  await driver.wait(until.urlIs("http://localhost:4200/addBook"), 5000);

  await driver.findElement(By.id('dialog_title_input')).sendKeys('Sample Book Title To test');

  const authorDropdown = await driver.findElement(By.id('dialog_author_input'));
  const authorSelect = new Select(authorDropdown);
  authorSelect.selectByVisibleText('David Brown');

  await driver.findElement(By.id('dialog_pageCount_input')).sendKeys('200');
  await driver.findElement(By.id('dialog_price_input')).sendKeys('25.99');
  await driver.findElement(By.id('dialog_photoUrl_input')).sendKeys('https://example.com/book-image.jpg');

  await driver.findElement(By.id('dialog_submit_button')).click();
  await driver.wait(until.urlIs("http://localhost:4200/home"), 5000);

  const isBookAdded = await driver.findElement(By.id('Sample-Book-Title-To-test')).isDisplayed();

  if (!isBookAdded) throwError(driver, "New book was not added");
  await driver.quit();
};


const editItem = async () => {
  let driver = await getDriver();

  const isBookBefore = await driver.findElement(By.id('The-Shining')).isDisplayed();
  if (!isBookBefore) throwError(driver, "Book not found on init editing");


  await driver.findElement(By.id('edit__book__The-Shining')).click();
  await driver.wait(until.urlContains("http://localhost:4200/editBook"), 5000);

  await driver.findElement(By.id('dialog_title_input')).sendKeys('Test test');


  await driver.findElement(By.id('dialog_submit_button')).click();
  await driver.wait(until.urlIs("http://localhost:4200/home"), 5000);

  const isBookAdded = await driver.findElement(By.id('The-ShiningTest-test')).isDisplayed();

  if (!isBookAdded) throwError(driver, "Item was not edit");
  await driver.quit();
};


const deleteItem = async () => {
  let driver = await getDriver();

  const isBookBefore = await driver.findElement(By.id('The-Shining')).isDisplayed();
  if (!isBookBefore) throwError(driver, "Book not found on init deleting");


  await driver.findElement(By.id('delete__book__The-Shining')).click();
  let isVisible = true;
  try {
    await driver.findElement(By.id('The-Shining')).isDisplayed();
  } catch (error) {
    isVisible = false;
  }

  if (isVisible) throwError(driver, "Book is still on page after deleting");
  await driver.quit();
};

const getItems = async () => {
  let driver = await getDriver();

  const b1 = await driver.findElement(By.id('The-Shining')).isDisplayed();
  if (!b1) throwError(driver, "The-Shining is not in page");
  const b2 = await driver.findElement(By.id('The-Da-Vinci-Code')).isDisplayed();
  if (!b2) throwError(driver, "The-Da-Vinci-Code is not in page");;
  const b3 = await driver.findElement(By.id('The-RoadXXX')).isDisplayed();
  if (!b3) throwError(driver, "The-Road is not in page");;

  await driver.quit();
};


const main = async () => {
  await login();
  await addItem();
  await editItem();
  await deleteItem();
  await getItems();

  console.log("Wszystkie testy przeszły");
};

main();
