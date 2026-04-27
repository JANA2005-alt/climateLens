import { useState, useEffect } from 'react';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WeatherCard } from './components/WeatherCard';
import { AQICard } from './components/AQICard';
import { CarbonFootprintCard } from './components/CarbonFootprintCard';

interface DashboardData {
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

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  const locations = [
    'Chennai, Tamil Nadu, India',
    'Coimbatore, Tamil Nadu, India',
    'Madurai, Tamil Nadu, India',
    'Trichy, Tamil Nadu, India',
  ] as const;
  type LocationKey = (typeof locations)[number];
  const [selectedLocation, setSelectedLocation] = useState<LocationKey>(locations[0]);

  useEffect(() => {
    fetchData();
  }, [selectedLocation]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call with realistic data
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const locationDetails: Record<LocationKey, { temperature: number; condition: string; humidity: number; level: number; }> = {
        'Chennai, Tamil Nadu, India': { temperature: 33, condition: 'Sunny', humidity: 70, level: 48 },
        'Coimbatore, Tamil Nadu, India': { temperature: 30, condition: 'Cloudy', humidity: 65, level: 55 },
        'Madurai, Tamil Nadu, India': { temperature: 35, condition: 'Hot', humidity: 60, level: 58 },
        'Trichy, Tamil Nadu, India': { temperature: 32, condition: 'Partly Cloudy', humidity: 68, level: 52 },
      };

      const details = locationDetails[selectedLocation];

      const mockData: DashboardData = {
        weather: {
          temperature: details.temperature,
          condition: details.condition,
          location: selectedLocation,
          humidity: details.humidity,
        },
        aqi: {
          level: details.level,
          status: details.level <= 50 ? 'Good' : details.level <= 100 ? 'Moderate' : 'Unhealthy',
          pm25: 15,
          pm10: 28,
          no2: 12,
        },
        carbon: {
          score: 'Medium',
          value: 58,
          emission: 4250,
          trend: 'down',
          breakdown: {
            transport: 45,
            energy: 35,
            food: 20,
          },
        },
      };

      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorMessage message={error || 'No data available'} onRetry={fetchData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Climate Lens
              </h1>
              <p className="text-lg text-gray-600">
                Environmental monitoring dashboard
              </p>
            </div>
            <div className="text-5xl">🌿</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Live environmental data</span>
            <span className="ml-4">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-800">Selected Location: {selectedLocation}</h2>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value as LocationKey)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Cards Grid - Responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <WeatherCard data={data.weather} />
          <AQICard data={data.aqi} />
          <CarbonFootprintCard data={data.carbon} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Air Quality</p>
            <p className="text-2xl font-bold text-green-600">{data.aqi.level}</p>
            <p className="text-xs text-gray-600 mt-1">AQI Score</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Temperature</p>
            <p className="text-2xl font-bold text-orange-600">{data.weather.temperature}°C</p>
            <p className="text-xs text-gray-600 mt-1">Current</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Carbon Score</p>
            <p className="text-2xl font-bold text-yellow-600">{data.carbon.value}/100</p>
            <p className="text-xs text-gray-600 mt-1">{data.carbon.score}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Humidity</p>
            <p className="text-2xl font-bold text-blue-600">{data.weather.humidity}%</p>
            <p className="text-xs text-gray-600 mt-1">Atmospheric</p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for a Sustainable Lifestyle</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">Transport</h4>
              <p className="text-sm text-gray-600">Use public transportation, carpool, or cycle when possible to reduce emissions.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">Energy</h4>
              <p className="text-sm text-gray-600">Switch to renewable energy sources and reduce energy consumption at home.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">Food</h4>
              <p className="text-sm text-gray-600">Choose plant-based options and support local, sustainable food sources.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh button */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-center">
        <button
          onClick={fetchData}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          🔄 Refresh Data
        </button>
      </div>
    </div>
  );
}

export default App;
