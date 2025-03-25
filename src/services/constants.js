export const WEATHER_API_KEY = "76b7e2c2b2494dc78b251402251903";
export const WEATHER_CODES = {
  SUNNY: [1000], // Clear, Sunny
  CLOUDY: [
    1003, // Partly cloudy
    1006, // Cloudy
    1009, // Overcast
    1030, // Mist
    1135, // Fog
    1147, // Freezing fog
  ],
  RAINY: [
    1063, // Patchy rain
    1150, // Patchy light drizzle
    1153, // Light drizzle
    1168, // Freezing drizzle
    1171, // Heavy freezing drizzle
    1180, // Patchy light rain
    1183, // Light rain
    1186, // Moderate rain at times
    1189, // Moderate rain
    1192, // Heavy rain at times
    1195, // Heavy rain
    1198, // Light freezing rain
    1201, // Moderate or heavy freezing rain
    1240, // Light rain shower
    1243, // Moderate or heavy rain shower
    1246, // Torrential rain shower
  ],
  SNOWY: [
    1066, // Patchy snow
    1069, // Patchy sleet
    1072, // Patchy freezing drizzle
    1114, // Blowing snow
    1117, // Blizzard
    1210, // Patchy light snow
    1213, // Light snow
    1216, // Patchy moderate snow
    1219, // Moderate snow
    1222, // Patchy heavy snow
    1225, // Heavy snow
    1237, // Ice pellets
    1255, // Light snow showers
    1258, // Moderate or heavy snow showers
    1261, // Light showers of ice pellets
    1264, // Moderate or heavy showers of ice pellets
  ],
  THUNDER: [
    1087, // Thundery outbreaks
    1273, // Patchy light rain with thunder
    1276, // Moderate or heavy rain with thunder
    1279, // Patchy light snow with thunder
    1282, // Moderate or heavy snow with thunder
    1198, // Light freezing rain
    1201, // Moderate or heavy freezing rain
    1168, // Freezing drizzle
    1171, // Heavy freezing drizzle
  ],
};

// Icon URLs based on condition code and time of day
export const getWeatherIcon = (code, isDay = 1) => {
  // Basic icons mapping with day/night variants
  const iconMap = {
    // Sunny/Clear
    1000: {
      day: "/assets/weatherIcons/day.svg",
      night: "/assets/weatherIcons/night.svg",
    },

    // Cloudy conditions
    1003: {
      day: "/assets/weatherIcons/cloudy-day-1.svg",
      night: "/assets/weatherIcons/cloudy-night-1.svg",
    },
    1006: {
      day: "/assets/weatherIcons/cloudy-day-2.svg",
      night: "/assets/weatherIcons/cloudy-night-2.svg",
    },
    1009: {
      day: "/assets/weatherIcons/cloudy.svg",
      night: "/assets/weatherIcons/cloudy.svg",
    },
    1030: {
      day: "/assets/weatherIcons/cloudy-day-3.svg",
      night: "/assets/weatherIcons/cloudy-night-3.svg",
    },
    1135: {
      day: "/assets/weatherIcons/cloudy-day-3.svg",
      night: "/assets/weatherIcons/cloudy-night-3.svg",
    },
    1147: {
      day: "/assets/weatherIcons/cloudy-day-3.svg",
      night: "/assets/weatherIcons/cloudy-night-3.svg",
    },

    // Rainy conditions
    1063: {
      day: "/assets/weatherIcons/rainy-1.svg",
      night: "/assets/weatherIcons/rainy-1.svg",
    },
    1150: {
      day: "/assets/weatherIcons/rainy-1.svg",
      night: "/assets/weatherIcons/rainy-1.svg",
    },
    1153: {
      day: "/assets/weatherIcons/rainy-2.svg",
      night: "/assets/weatherIcons/rainy-2.svg",
    },
    1168: {
      day: "/assets/weatherIcons/rainy-3.svg",
      night: "/assets/weatherIcons/rainy-3.svg",
    },
    1171: {
      day: "/assets/weatherIcons/rainy-4.svg",
      night: "/assets/weatherIcons/rainy-4.svg",
    },
    1180: {
      day: "/assets/weatherIcons/rainy-2.svg",
      night: "/assets/weatherIcons/rainy-2.svg",
    },
    1183: {
      day: "/assets/weatherIcons/rainy-3.svg",
      night: "/assets/weatherIcons/rainy-3.svg",
    },
    1186: {
      day: "/assets/weatherIcons/rainy-4.svg",
      night: "/assets/weatherIcons/rainy-4.svg",
    },
    1189: {
      day: "/assets/weatherIcons/rainy-5.svg",
      night: "/assets/weatherIcons/rainy-5.svg",
    },
    1192: {
      day: "/assets/weatherIcons/rainy-6.svg",
      night: "/assets/weatherIcons/rainy-6.svg",
    },
    1195: {
      day: "/assets/weatherIcons/rainy-7.svg",
      night: "/assets/weatherIcons/rainy-7.svg",
    },
    1198: {
      day: "/assets/weatherIcons/rainy-7.svg",
      night: "/assets/weatherIcons/rainy-7.svg",
    },
    1201: {
      day: "/assets/weatherIcons/rainy-7.svg",
      night: "/assets/weatherIcons/rainy-7.svg",
    },

    // Snowy conditions
    1066: {
      day: "/assets/weatherIcons/snowy-1.svg",
      night: "/assets/weatherIcons/snowy-1.svg",
    },
    1069: {
      day: "/assets/weatherIcons/snowy-2.svg",
      night: "/assets/weatherIcons/snowy-2.svg",
    },
    1072: {
      day: "/assets/weatherIcons/snowy-3.svg",
      night: "/assets/weatherIcons/snowy-3.svg",
    },
    1114: {
      day: "/assets/weatherIcons/snowy-2.svg",
      night: "/assets/weatherIcons/snowy-2.svg",
    },
    1117: {
      day: "/assets/weatherIcons/snowy-3.svg",
      night: "/assets/weatherIcons/snowy-3.svg",
    },
    1210: {
      day: "/assets/weatherIcons/snowy-3.svg",
      night: "/assets/weatherIcons/snowy-3.svg",
    },
    1213: {
      day: "/assets/weatherIcons/snowy-4.svg",
      night: "/assets/weatherIcons/snowy-4.svg",
    },
    1216: {
      day: "/assets/weatherIcons/snowy-5.svg",
      night: "/assets/weatherIcons/snowy-5.svg",
    },
    1219: {
      day: "/assets/weatherIcons/snowy-6.svg",
      night: "/assets/weatherIcons/snowy-6.svg",
    },
    1222: {
      day: "/assets/weatherIcons/snowy-5.svg",
      night: "/assets/weatherIcons/snowy-5.svg",
    },
    1225: {
      day: "/assets/weatherIcons/snowy-6.svg",
      night: "/assets/weatherIcons/snowy-6.svg",
    },
    1237: {
      day: "/assets/weatherIcons/snowy-6.svg",
      night: "/assets/weatherIcons/snowy-6.svg",
    },
    1255: {
      day: "/assets/weatherIcons/snowy-7.svg",
      night: "/assets/weatherIcons/snowy-7.svg",
    },
    1258: {
      day: "/assets/weatherIcons/snowy-8.svg",
      night: "/assets/weatherIcons/snowy-8.svg",
    },
    1261: {
      day: "/assets/weatherIcons/snowy-9.svg",
      night: "/assets/weatherIcons/snowy-9.svg",
    },
    1264: {
      day: "/assets/weatherIcons/snowy-10.svg",
      night: "/assets/weatherIcons/snowy-10.svg",
    },

    // Thunder conditions
    1087: {
      day: "/assets/weatherIcons/thunder.svg",
      night: "/assets/weatherIcons/thunder.svg",
    },
    1273: {
      day: "/assets/weatherIcons/thunder.svg",
      night: "/assets/weatherIcons/thunder.svg",
    },
    1276: {
      day: "/assets/weatherIcons/thunder.svg",
      night: "/assets/weatherIcons/thunder.svg",
    },
    1279: {
      day: "/assets/weatherIcons/thunder.svg",
      night: "/assets/weatherIcons/thunder.svg",
    },
    1282: {
      day: "/assets/weatherIcons/thunder.svg",
      night: "/assets/weatherIcons/thunder.svg",
    },
  };

  // Get the icon set for the weather code
  const iconSet = iconMap[code];
  if (!iconSet) return iconMap[1000][isDay ? "day" : "night"]; // Default to clear sky

  // Return appropriate day/night variant
  return iconSet[isDay ? "day" : "night"];
};

// Get condition name from code
export const getWeatherCondition = (code) => {
  if (WEATHER_CODES.SUNNY.includes(code)) return "sunny";
  if (WEATHER_CODES.CLOUDY.includes(code)) return "cloudy";
  if (WEATHER_CODES.RAINY.includes(code)) return "rainy";
  if (WEATHER_CODES.SNOWY.includes(code)) return "snowy";
  if (WEATHER_CODES.THUNDER.includes(code)) return "thunder";
  return "unknown";
};
