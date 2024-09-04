# Next.js Weather Leaflet App

This project is a weather application built with Next.js, Leaflet, and the OpenWeather API. It allows users to click on the map to get real-time weather data for the selected location.

## Features

- **Interactive Map**: Powered by Leaflet with geolocation search.
- **Weather Data**: Displays weather information such as temperature, humidity, wind speed, etc., for the selected location.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used

- **Next.js**: React framework for building server-side rendered applications.
- **Leaflet**: JavaScript library for interactive maps.
- **OpenWeather API**: Provides real-time weather data.
- **TypeScript**: Static type checking.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/pnvdev/nextjs-weather-leaflet.git
   cd nextjs-weather-leaflet
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your OpenWeather API key in a `.env.local` file:

   ```plaintext
   NEXT_PUBLIC_OPEN_WEATHER_API_KEY=your_api_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

This project is deployed on Vercel. You can also deploy it on any platform that supports Next.js.

## License

This project is open source and available under the [MIT License](LICENSE).
