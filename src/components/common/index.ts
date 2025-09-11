// Common components exports
export { 
  AnimatedNumber, 
  AnimatedTemperature, 
  AnimatedWindSpeed, 
  AnimatedPrecipitation, 
  AnimatedPressure,
  AnimatedWindGusts,
  AnimatedCloudCover,
  AnimatedDewPoint,
  AnimatedPrecipitationProbability
} from './animated-number';

// Lottie-based metric components (new standardized approach)
export {
  LottieMetric,
  LottieTemperature,
  LottieWindSpeed,
  LottiePrecipitation,
  LottiePressure,
  LottieHumidity,
  LottieUVIndex,
  LottiePollen,
  LottieAirQuality,
  LottiePrecipitationProbability,
  LottieCloudCover,
  LottieDewPoint,
  LottieWindGusts,
  // Specific air quality components
  LottiePM25,
  LottiePM10,
  LottieO3,
  LottieNO2,
  LottieSO2,
  LottieCO,
  // Additional metrics
  LottieVisibility
} from './lottie-metric';