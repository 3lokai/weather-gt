// lib/i18n/en.ts
const en = {
  app: {
    title: 'Weather',
    lastUpdated: 'Last updated at {{time}}',
    offline: 'Showing last good data',
    attribution: 'Data by Open‑Meteo · Icons by Meteocons',
  },
  actions: {
    search: 'Search', 
    favorite: 'Favorite', 
    compare: 'Compare', 
    share: 'Share',
    install: 'Install App', 
    retry: 'Retry', 
    copyLink: 'Copy link'
  },
  units: {
    celsius: '°C', 
    fahrenheit: '°F', 
    kmh: 'km/h', 
    mph: 'mph', 
    mm: 'mm', 
    inch: 'in', 
    hPa: 'hPa', 
    inHg: 'inHg'
  },
  settings: {
    title: 'Settings', 
    units: 'Units', 
    tempUnit: 'Temperature', 
    windUnit: 'Wind speed', 
    precipUnit: 'Precipitation',
    timeFormat: 'Time format', 
    _12h: '12‑hour', 
    _24h: '24‑hour',
    theme: 'Theme', 
    system: 'System', 
    light: 'Light', 
    dark: 'Dark', 
    autoTime: 'Auto by time',
    motion: 'Reduced motion', 
    language: 'Language', 
    reset: 'Reset app'
  },
  metrics: {
    temperature: 'Temperature', 
    feelsLike: 'Feels like', 
    humidity: 'Humidity', 
    wind: 'Wind', 
    gust: 'Gust',
    precip: 'Precipitation', 
    pop: 'Chance of precip', 
    pressure: 'Pressure', 
    pressureTrend: 'Trend',
    uv: 'UV Index', 
    visibility: 'Visibility', 
    cloud: 'Cloud cover', 
    dewPoint: 'Dew point',
    aqi: 'Air Quality', 
    pollen: 'Pollen'
  },
  tooltips: {
    pop: 'Probability of precipitation in the period',
    pressureTrend: 'Change in surface pressure vs last 3–6 hours',
    uv: 'Max UV exposure risk today',
    dewPoint: 'Temp where air becomes saturated; closer to air temp feels muggy'
  },
  a11y: {
    searchPlaceholder: 'Search for a city or place',
    iconLabel: '{{label}}',
    dayChip: 'Day {{index}}: high {{high}}, low {{low}}, precipitation {{pop}} percent',
    hourlyPoint: '{{time}}: {{temp}} and {{pop}} percent precip',
  },
  states: {
    emptySearch: "Type to search…",
    noResults: 'No locations found',
    error: 'Could not load data',
    geoDenied: 'Location permission denied — use search',
  },
};

export default en;
