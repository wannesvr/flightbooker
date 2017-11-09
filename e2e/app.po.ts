import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getFlights() {
    return element.all(by.css('ul li'));
  }

  getFlightByName(name: string) {
    return element(by.cssContainingText('ul li div h2', name));
  }
}
