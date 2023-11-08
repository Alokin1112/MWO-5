import { Forecast, ForecastHour, GeneralTemperature, GeneralTemperatureForecast, Weather } from "@core/interfaces/weather.interface";

export class WeatherModel {

  private weatherData: {
    currentWeather: Weather,
    yesterdayWeather: Weather,
    oneDayForecast: Forecast,
    fiveDayForecast: Forecast,
    oneHourForecast: ForecastHour,
    twelveHoursForecast: ForecastHour,
  };

  constructor(
    currentWeather: Weather,
    yesterdayWeather: Weather,
    oneDayForecast: Forecast,
    fiveDayForecast: Forecast,
    oneHourForecast: ForecastHour,
    twelveHoursForecast: ForecastHour,
  ) {
    this.weatherData = {
      currentWeather,
      yesterdayWeather,
      oneDayForecast,
      fiveDayForecast,
      oneHourForecast,
      twelveHoursForecast,
    };
  }

  get currentTemperature(): GeneralTemperature {
    const temperature = this.weatherData?.currentWeather?.Temperature?.Metric?.Value || 0;
    return ({
      value: `${temperature} °C`,
      icon: this.getIcon(temperature)
    });
  }

  get yesterdayTemperature(): GeneralTemperature {
    const temperature = this.weatherData?.yesterdayWeather?.Temperature?.Metric?.Value || 0;
    return ({
      value: `${temperature} °C`,
      icon: this.getIcon(temperature)
    });
  }

  get oneDayTemperature(): GeneralTemperatureForecast {
    const temperatureMinimum = this.weatherData?.oneDayForecast?.DailyForecasts[0]?.Temperature?.Minimum?.Value || 0;
    const temperatureMaximum = this.weatherData?.oneDayForecast?.DailyForecasts[0]?.Temperature?.Maximum?.Value || 0;
    return ({
      minimum: {
        value: `${temperatureMinimum} °C`,
        icon: this.getIcon(temperatureMinimum)
      },
      maximum: {
        value: `${temperatureMaximum} °C`,
        icon: this.getIcon(temperatureMaximum)
      }
    });
  }

  get fiveDayTemperature(): GeneralTemperatureForecast {
    const temperatureMinimum = this.weatherData?.fiveDayForecast?.DailyForecasts[0]?.Temperature?.Minimum?.Value || 0;
    const temperatureMaximum = this.weatherData?.fiveDayForecast?.DailyForecasts[0]?.Temperature?.Maximum?.Value || 0;
    return ({
      minimum: {
        value: `${temperatureMinimum} °C`,
        icon: this.getIcon(temperatureMinimum)
      },
      maximum: {
        value: `${temperatureMaximum} °C`,
        icon: this.getIcon(temperatureMaximum)
      }
    });
  }

  get oneHourTemperature(): GeneralTemperature {
    const temperature = this.weatherData?.oneHourForecast?.Temperature?.Value || 0;
    return ({
      value: `${temperature} °C`,
      icon: this.getIcon(temperature)

    });
  }

  get twelveHoursTemperature(): GeneralTemperature {
    const temperature = this.weatherData?.twelveHoursForecast?.Temperature?.Value || 0;
    return ({
      value: `${temperature} °C`,
      icon: this.getIcon(temperature)

    });
  }

  private getIcon(temperature: number): string {
    return temperature > 20 ? '🔥' : '🥶';
  }
}