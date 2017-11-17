# How to run

Install [json-server](https://github.com/typicode/json-server) if you do no have it installed yet.

```json-server ./flights.json```

```ng serve```

# Running tests
## Unit and Integration tests

Use `ng test` to run all unit and integration tests.

## E2E tests

For the e2e tests I added a new file 'flights-e2e.json' since we don't want to change our tests everytime the database content changes. 

Run `json-server flights-e2e.json` and `ng e2e`.