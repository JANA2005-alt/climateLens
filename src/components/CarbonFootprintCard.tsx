import { FC } from 'react';
import { Card } from './Card';

interface CarbonFootprintData {
  score: 'Low' | 'Medium' | 'High';
  value: number;
  emission: number;
  trend: 'up' | 'down' | 'stable';
  breakdown: {
    transport: number;
    energy: number;
    food: number;
  };
}

interface CarbonFootprintCardProps {
  data: CarbonFootprintData;
}

export const CarbonFootprintCard: FC<CarbonFootprintCardProps> = ({ data }) => {
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'Low':
        return { bg: 'bg-green-50', text: 'text-green-600', icon: '🟢', badge: 'bg-green-100 text-green-700' };
      case 'Medium':
        return { bg: 'bg-yellow-50', text: 'text-yellow-600', icon: '🟡', badge: 'bg-yellow-100 text-yellow-700' };
      case 'High':
        return { bg: 'bg-red-50', text: 'text-red-600', icon: '🔴', badge: 'bg-red-100 text-red-700' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-600', icon: '⭕', badge: 'bg-gray-100 text-gray-700' };
    }
  };

  const colors = getScoreColor(data.score);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return { text: '↑', color: 'text-red-600' };
      case 'down':
        return { text: '↓', color: 'text-green-600' };
      case 'stable':
        return { text: '→', color: 'text-blue-600' };
      default:
        return { text: '?', color: 'text-gray-600' };
    }
  };

  const trendInfo = getTrendIcon(data.trend);

  return (
    <Card title="Carbon Footprint" icon="🌍">
      <div className="space-y-4">
        <div className={`${colors.bg} rounded-lg p-6 text-center`}>
          <p className="text-gray-500 text-sm mb-2">Current Score</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{colors.icon}</span>
            <div>
              <p className={`text-3xl font-bold ${colors.text}`}>{data.score}</p>
              <p className="text-sm text-gray-600">{data.value}/100</p>
            </div>
          </div>
        </div>

        <div className={`${colors.badge} px-4 py-2 rounded-lg flex items-center justify-between`}>
          <span className="font-semibold text-sm">Annual Emission</span>
          <div className="flex items-center gap-2">
            <span className={`${trendInfo.color} text-lg font-bold`}>{trendInfo.text}</span>
            <span className="font-bold">{data.emission} kg CO₂</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Breakdown by Category</p>
          
          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Transport</span>
                <span className="text-xs font-semibold text-gray-700">{data.breakdown.transport}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                  style={{ width: `${data.breakdown.transport}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Energy</span>
                <span className="text-xs font-semibold text-gray-700">{data.breakdown.energy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                  style={{ width: `${data.breakdown.energy}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Food</span>
                <span className="text-xs font-semibold text-gray-700">{data.breakdown.food}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                  style={{ width: `${data.breakdown.food}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-gray-500 mb-1">Action Items</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ Use public transport when possible</li>
            <li>✓ Switch to renewable energy sources</li>
            <li>✓ Reduce meat consumption</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
