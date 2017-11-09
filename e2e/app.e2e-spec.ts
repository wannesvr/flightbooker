import { AppPage } from './app.po';
import { protractor, browser } from 'protractor';

describe('demo App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Angular Flightbooker');
  });

  it('should display some flights', () => {
    let flights = page.getFlights();

    expect(flights.count()).toBe(4);
  });


  it('should locate all four flights by name', () => {
    const flights = ['Brussels Airlines', 'Brussels Airlines', 'Delta', 'Lufthansa'];

    const flightElements = flights.map((flight) => {
      return page.getFlightByName(flight).getText();  
    });
    
     protractor.promise.all(flightElements).then((values) => {
       values.forEach((value, index) => {
         expect(value).toBe(flights[index]);
       })
     });
  });
});
