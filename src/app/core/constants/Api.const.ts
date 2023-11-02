export const API = {
  AUTOCOMPLETE_ENDPOINT: '/locations/v1/cities/autocomplete',
  CURRENT_CONDITION_TEMPLATE: '/currentconditions/v1/:locationKey',
  YESTERDAYS_TEMPERATURE: '/currentconditions/v1/:locationKey/historical/24',
  ONE_DAY_FORECAST: '/forecasts/v1/daily/1day/:locationKey',
  FIVE_DAY_FORECAST: '/forecasts/v1/daily/5day/:locationKey',
  ONE_HOUR_FORECAST: "/forecasts/v1/hourly/1hour/:locationKey",
  TWELVE_HOUR_FORECAST: "/forecasts/v1/hourly/12hour/:locationKey",

  BOOKS: "/api/v1/books",
  BOOKS_ID: "/api/v1/books/:id",

  AUTHORS: "/api/v1/authors",
  AUTHORS_ID: "/api/v1/authors/:id"
};
