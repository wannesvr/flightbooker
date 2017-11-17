import { browser, by, element, protractor } from 'protractor';

const until = protractor.ExpectedConditions;
const WAIT_TIMEOUT = 1000;

export class FlightListPage {
  navigateTo() {
    return browser.get('/');
  }

  wait(timeout: number = 500) {
    browser.sleep(timeout);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getFlights() {
    browser.wait(until.presenceOf(element(by.css('ul'))), WAIT_TIMEOUT, 'Could not find any flights');
    return element.all(by.css('ul li'));
  }

  getFlightByName(name: string) {
    return element(by.cssContainingText('ul li div h2', name));
  }

  searchFlights(name: string) {
    const searchBox = element(by.css('#search'));

    if (!name) {
      searchBox.clear();
    } else {
      searchBox.sendKeys(name);
    }
  }

  addPassenger(firstName: string, lastName: string) {
    const firstNameInput = element(by.css('#firstNameInput'));
    //const lastNameInput = element(by.css('#lastNameInput'));
    //const button = element(by.css('#addPassengerButton'));

    firstNameInput.sendKeys(firstName);
    //lastNameInput.sendKeys(lastName);

    //button.click();
  }
}
