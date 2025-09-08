# Open-Meteo Parameter Matrix — Single Source of Truth

This document serves as the definitive reference for Open-Meteo API integration parameters and endpoints.

## Endpoints

* **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search?name={q}&count=10&language={lang}`
* **Forecast**: `https://api.open-meteo.com/v1/forecast` (supports `current`, `hourly`, `daily`, `timezone=auto`, units)
* **Air Quality + Pollen**: `https://air-quality-api.open-meteo.com/v1/air-quality` (pollutants + **pollen** indices)

## Variables (pick per view)

### Current Weather
```
temperature_2m,apparent_temperature,weather_code,is_day,wind_speed_10m,wind_gusts_10m,relative_humidity_2m,precipitation,precipitation_probability,surface_pressure,uv_index,visibility,cloud_cover,dew_point_2m
```

### Hourly Forecast
```
temperature_2m,precipitation,precipitation_probability,wind_speed_10m,wind_gusts_10m,uv_index,visibility,cloud_cover,dew_point_2m,surface_pressure
```

### Daily Forecast
```
weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,cloud_cover_mean
```

### Air Quality (Hourly)
```
pm10,pm2_5,o3,no2,so2,co,european_aqi,us_aqi,uv_index,uv_index_clear_sky
```

### Pollen (Hourly via air-quality endpoint)
```
alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen
```

## Units

* `temperature_unit=celsius|fahrenheit`
* `wind_speed_unit=kmh|mph|ms|kn`
* `precipitation_unit=mm|inch`
* `timeformat=iso8601|unixtime` (still localize in UI); `timezone=auto`

## Example URL (compose)

```
https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&timezone=auto&timeformat=iso8601&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm&
current=temperature_2m,apparent_temperature,weather_code,is_day,wind_speed_10m,wind_gusts_10m,relative_humidity_2m,precipitation,precipitation_probability,surface_pressure,uv_index,visibility,cloud_cover,dew_point_2m&
hourly=temperature_2m,precipitation,precipitation_probability,wind_speed_10m,wind_gusts_10m,uv_index,visibility,cloud_cover,dew_point_2m,surface_pressure&
daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,cloud_cover_mean
```

## Parameter Groups by Feature

### Core Weather Data
- **Temperature**: `temperature_2m`, `apparent_temperature`, `dew_point_2m`
- **Precipitation**: `precipitation`, `precipitation_probability`, `precipitation_sum`
- **Wind**: `wind_speed_10m`, `wind_gusts_10m`
- **Atmosphere**: `relative_humidity_2m`, `surface_pressure`, `cloud_cover`
- **Visibility**: `visibility`, `uv_index`

### Extended Data
- **Air Quality**: `pm10`, `pm2_5`, `o3`, `no2`, `so2`, `co`, `european_aqi`, `us_aqi`
- **Pollen**: `alder_pollen`, `birch_pollen`, `grass_pollen`, `mugwort_pollen`, `olive_pollen`, `ragweed_pollen`
- **Astronomical**: `sunrise`, `sunset`

### Metadata
- **Weather Codes**: `weather_code` (WMO codes 0-99)
- **Time Indicators**: `is_day` (boolean)
- **Time Zones**: `timezone=auto` (recommended)

## Usage Notes

1. **Timezone**: Always use `timezone=auto` for automatic timezone detection
2. **Units**: Default to metric (celsius, kmh, mm) with user preference override
3. **Time Format**: Use `iso8601` for better parsing, localize in UI
4. **Caching**: Responses can be cached for 10-15 minutes for current weather
5. **Rate Limits**: Open-Meteo has generous limits but implement reasonable caching
