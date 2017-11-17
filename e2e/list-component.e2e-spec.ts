import { protractor, browser } from 'protractor';

import { FlightListPage } from './list-component.po';
import { FlightDetailPage } from './detail-component.po';

describe('FlightListPage', () => {
  let page: FlightListPage;
  let detailPage: FlightDetailPage;

  beforeEach(() => {
    page = new FlightListPage();
    detailPage = new FlightDetailPage();
    
    page.navigateTo();    
  });

  it('should display welcome message', () => {
    expect(page.getParagraphText()).toEqual('Welcome to Flightbooker');
  });

  it('should display some flights', () => {
    let flights = page.getFlights();

    expect(flights.count()).toBe(5);
  });


  it('should locate all five flights by name', () => {
    const flights = ['Brussels Airlines', 'KLM', 'Delta', 'Ryanair', 'Lufthansa'];

    const flightElements = flights.map((flight) => {
      return page.getFlightByName(flight).getText();
    });

    protractor.promise.all(flightElements).then((values) => {
      values.forEach((value, index) => {
        expect(value).toBe(flights[index]);
      })
    });
  });

  it('should filter the list when searched', () => {
    page.searchFlights('KLM');
    page.wait();

    expect(page.getFlights().count()).toBe(1);
  })

  // Not working yet :(
  // it('should add a passenger to the first flight, go to the detail page and cancel the booking', () => {
  //   page.addPassenger('Passenger', 'One');

  //   detailPage.navigateTo();
  // });
});
