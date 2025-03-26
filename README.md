# Weather Wise ⛅

A modern weather application built with React that provides real-time weather information with a beautiful and interactive UI.

![Weather Wise App](public/assets/home7.jpg)

## Features 🌟

- **Real-time Weather Data**: Get current weather conditions for any location
- **5-Day Forecast**: View detailed weather forecasts for the next 5 days
- **Dynamic Backgrounds**: Weather-based video backgrounds that change according to conditions
- **Day/Night Icons**: Different icons for day and night weather conditions
- **Air Quality Index**: Monitor the air quality in your selected location
- **UV Index**: Check the UV levels and get safety recommendations
- **Search Functionality**: Search for any city with autocomplete suggestions
- **Responsive Design**: Works perfectly on all devices

## Technologies Used 💻

- React 18
- Vite
- TailwindCSS
- React Query
- React Router
- WeatherAPI
- Date-fns
- React Icons

## Live Demo 🚀

[Visit Weather Wise](your-deployed-url-here)

## Installation and Setup 🛠️

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-wise.git
```

2. Install dependencies:

```bash
cd weather-wise
npm install
```

3. Create a `.env` file in the root directory and add your WeatherAPI key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure 📁

```
weather-wise/
├── public/
│   ├── assets/
│   │   ├── videos/       # Weather background videos
│   │   └── weatherIcons/ # Weather condition icons
├── src/
│   ├── components/       # Reusable components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API and utility functions
│   └── ui/             # UI components
```

## Features in Detail 📝

### Current Weather

- Temperature (°C/°F toggle)
- Weather condition with icon
- Wind speed
- Humidity
- Precipitation chance

### Forecast

- 5-day weather forecast
- Daily high and low temperatures
- Weather condition icons
- Precipitation probability

### Additional Information

- Air Quality Index
- UV Index
- Sunrise and sunset times
- Location search with suggestions

## API Integration 🌐

This project uses the [WeatherAPI](https://www.weatherapi.com/) for weather data. Features include:

- Current weather
- Weather forecasts
- Air quality data
- Location autocomplete

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments 🙏

- Weather data provided by [WeatherAPI](https://www.weatherapi.com/)
- Weather icons by [Weather Icons](https://erikflowers.github.io/weather-icons/)
- Background videos from [Your Video Source]

## Contact 📧

Your Name - [@mu_daii](https://x.com/mu_daii)

Project Link: [https://github.com/mudaii1/weather-wise](https://github.com/mudaii1/weather-wise)
