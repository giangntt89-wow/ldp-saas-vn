import { type ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
  dark?: boolean;
};

export default function BentoCard({ className = '', children, dark = false }: Props) {
  return (
    <div
      className={`
        rounded-2xl p-6 border transition-all duration-300
        ${dark
          ? 'bg-slate-800 border-slate-700 text-white hover:border-blue-500'
          : 'bg-white border-slate-200 text-slate-900 hover:border-blue-300 hover:shadow-lg'
        }
        ${className}
      `}
    >
      {/* Antigravity: [Hover state – scale(1.02) with box-shadow elevation] */}
      {children}
    </div>
  );
}
