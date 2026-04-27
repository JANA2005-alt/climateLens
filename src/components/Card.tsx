import { FC, ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const Card: FC<CardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-2xl">{icon}</div>}
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};
