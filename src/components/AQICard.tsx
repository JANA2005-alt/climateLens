import { FC } from 'react';
import { Card } from './Card';

interface AQIData {
  level: number;
  status: 'Good' | 'Moderate' | 'Unhealthy';
  pm25: number;
  pm10: number;
  no2: number;
}

interface AQICardProps {
  data: AQIData;
}

export const AQICard: FC<AQICardProps> = ({ data }) => {
  const getAQIColor = (status: string) => {
    switch (status) {
      case 'Good':
        return { bg: 'bg-green-50', text: 'text-green-600', badge: 'bg-green-100 text-green-700' };
      case 'Moderate':
        return { bg: 'bg-yellow-50', text: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-700' };
      case 'Unhealthy':
        return { bg: 'bg-red-50', text: 'text-red-600', badge: 'bg-red-100 text-red-700' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-600', badge: 'bg-gray-100 text-gray-700' };
    }
  };

  const colors = getAQIColor(data.status);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Good':
        return '✓';
      case 'Moderate':
        return '⚠';
      case 'Unhealthy':
        return '✕';
      default:
        return '?';
    }
  };

  return (
    <Card title="Air Quality Index" icon="💨">
      <div className="space-y-4">
        <div className={`${colors.bg} rounded-lg p-6 text-center`}>
          <p className="text-gray-500 text-sm mb-2">AQI Level</p>
          <div className="flex items-center justify-center gap-2">
            <p className={`text-4xl font-bold ${colors.text}`}>{data.level}</p>
            <div className={`${colors.badge} px-3 py-1 rounded-full font-semibold text-sm flex items-center gap-1`}>
              <span>{getStatusIcon(data.status)}</span>
              {data.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">PM2.5</p>
            <p className="text-xl font-bold text-orange-600">{data.pm25}</p>
            <p className="text-xs text-gray-500">μg/m³</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">PM10</p>
            <p className="text-xl font-bold text-amber-600">{data.pm10}</p>
            <p className="text-xs text-gray-500">μg/m³</p>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">NO₂</p>
            <p className="text-xl font-bold text-rose-600">{data.no2}</p>
            <p className="text-xs text-gray-500">ppb</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-gray-500 mb-2">Health Recommendation</p>
          <p className="text-sm text-gray-700">
            {data.status === 'Good'
              ? 'Air quality is good. Enjoy outdoor activities!'
              : data.status === 'Moderate'
              ? 'Air quality is acceptable. Sensitive groups should reduce prolonged outdoor activity.'
              : 'Air quality is unhealthy. Avoid outdoor activity.'}
          </p>
        </div>
      </div>
    </Card>
  );
};
