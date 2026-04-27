import { FC } from 'react';
import { Card } from './Card';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
}

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: FC<WeatherCardProps> = ({ data }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rainy':
      case 'rain':
        return '🌧️';
      case 'snowy':
      case 'snow':
        return '❄️';
      default:
        return '🌤️';
    }
  };

  return (
    <Card title="Weather" icon={getWeatherIcon(data.condition)}>
      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm mb-1">Location</p>
          <p className="text-lg font-semibold text-gray-800">{data.location}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">Temperature</p>
            <p className="text-3xl font-bold text-blue-600">{data.temperature}°C</p>
          </div>
          
          <div className="bg-cyan-50 rounded-lg p-4">
            <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">Condition</p>
            <p className="text-lg font-semibold text-cyan-600 capitalize">{data.condition}</p>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4">
          <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">Humidity</p>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all"
                style={{ width: `${data.humidity}%` }}
              ></div>
            </div>
            <p className="text-lg font-semibold text-indigo-600">{data.humidity}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
