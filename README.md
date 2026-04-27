# Climate Lens - Environmental Dashboard

A modern, responsive React dashboard built with Tailwind CSS that displays real-time environmental data including weather, air quality index (AQI), and carbon footprint tracking.

## Features

✨ **Weather Monitoring**
- Real-time temperature and weather conditions
- Humidity tracking with visual gauge
- Location-based weather information

🌍 **Air Quality Index (AQI)**
- Color-coded AQI levels (Green, Yellow, Red)
- Detailed pollutant breakdown (PM2.5, PM10, NO₂)
- Health recommendations based on air quality

♻️ **Carbon Footprint Tracking**
- Sustainability score (Low, Medium, High)
- Annual CO₂ emission tracking
- Breakdown by category (Transport, Energy, Food)
- Trend indicators

📱 **Responsive Design**
- Mobile-first design approach
- Optimized for desktop, tablet, and mobile devices
- Adaptive grid layouts

🎨 **Modern UI**
- Clean card-based layout (3 cards per row on desktop)
- Smooth shadows and rounded corners
- Gradient backgrounds
- Loading spinners and error states
- Smooth transitions and hover effects

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Vite** - Next-generation build tool

## Project Structure

```
src/
├── components/
│   ├── Card.tsx                 # Reusable card component
│   ├── WeatherCard.tsx          # Weather data display
│   ├── AQICard.tsx              # Air Quality Index display
│   ├── CarbonFootprintCard.tsx  # Carbon footprint metrics
│   ├── LoadingSpinner.tsx       # Loading state indicator
│   └── ErrorMessage.tsx         # Error state display
├── App.tsx                      # Main dashboard component
├── main.tsx                     # Application entry point
└── index.css                    # Tailwind CSS imports
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd climateLens
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Features in Detail

### Weather Card
- Displays current temperature and conditions
- Shows location information
- Includes humidity level with visual progress bar
- Weather-specific emoji icons

### AQI Card
- Color-coded status badges (Good/Moderate/Unhealthy)
- Real-time AQI level (0-500 scale)
- Detailed pollutant measurements
- Health recommendations for users

### Carbon Footprint Card
- Overall sustainability score (0-100)
- Annual CO₂ emissions tracking
- Trend indicators (up/down/stable)
- Breakdown charts for three categories
- Actionable sustainability tips

### Quick Stats Section
- Fast overview of key metrics
- 2x2 grid on mobile, 4-column grid on desktop
- Easy-to-scan key performance indicators

### Sustainability Tips
- Transport recommendations
- Energy efficiency tips
- Dietary suggestions

## Responsive Breakpoints

- **Mobile**: < 768px - Single column layout
- **Tablet**: 768px - 1024px - Two-column layout
- **Desktop**: > 1024px - Three-column card layout

## Color Scheme

- **Good/Green**: #10b981 (Emerald)
- **Moderate/Yellow**: #f59e0b (Amber)
- **Unhealthy/Red**: #ef4444 (Red)
- **Primary**: Blue gradients
- **Secondary**: Purple accents
- **Background**: Soft gradient from blue to indigo

## Data Format

The dashboard uses mock data that follows this structure:

```typescript
{
  weather: {
    temperature: number;
    condition: string;
    location: string;
    humidity: number;
  };
  aqi: {
    level: number;
    status: 'Good' | 'Moderate' | 'Unhealthy';
    pm25: number;
    pm10: number;
    no2: number;
  };
  carbon: {
    score: 'Low' | 'Medium' | 'High';
    value: number;
    emission: number;
    trend: 'up' | 'down' | 'stable';
    breakdown: {
      transport: number;
      energy: number;
      food: number;
    };
  };
}
```

## Customization

### Adding Real API Integration
Replace the mock data in `App.tsx` with actual API calls:

```typescript
const fetchData = async () => {
  const response = await fetch('YOUR_API_ENDPOINT');
  const data = await response.json();
  setData(data);
};
```

### Modifying Colors
Update the Tailwind config in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      aqi: {
        green: '#YOUR_COLOR',
        yellow: '#YOUR_COLOR',
        red: '#YOUR_COLOR',
      }
    },
  },
}
```

### Adjusting Layout
Edit the grid classes in `App.tsx` to change card arrangements:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized bundle size with Vite
- Fast hot module reloading (HMR) in development
- Minimal CSS with Tailwind CSS purging
- Lazy loading support ready

## Future Enhancements

- [ ] Real weather API integration (OpenWeatherMap, WeatherAPI)
- [ ] Real AQI data from environmental APIs
- [ ] User authentication and profiles
- [ ] Data persistence with local storage
- [ ] Chart libraries for historical trends
- [ ] Export reports functionality
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Real-time WebSocket updates

## License

This project is open source and available for personal and commercial use.

## Contributing

Contributions are welcome! Feel free to fork the project and submit pull requests.

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for a sustainable future
