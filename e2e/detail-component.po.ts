import { browser, by, element, protractor } from 'protractor';

const until = protractor.ExpectedConditions;
const WAIT_TIMEOUT = 1000;

export class FlightDetailPage {
  navigateTo() {
    return browser.get('/flights/cancel/0/0');
  }
}