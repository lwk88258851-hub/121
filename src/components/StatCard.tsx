import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: React.ReactNode;
  trend?: number;
  suffix?: string;
  trendSuffix?: string;
  trendUpIsGood?: boolean;
  color?: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose';
  className?: string;
}

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', trendBg: 'bg-emerald-50', trendText: 'text-emerald-600', trendDownBg: 'bg-rose-50', trendDownText: 'text-rose-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', trendBg: 'bg-emerald-50', trendText: 'text-emerald-600', trendDownBg: 'bg-rose-50', trendDownText: 'text-rose-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', trendBg: 'bg-emerald-50', trendText: 'text-emerald-600', trendDownBg: 'bg-rose-50', trendDownText: 'text-rose-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', trendBg: 'bg-emerald-50', trendText: 'text-emerald-600', trendDownBg: 'bg-rose-50', trendDownText: 'text-rose-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', trendBg: 'bg-emerald-50', trendText: 'text-emerald-600', trendDownBg: 'bg-rose-50', trendDownText: 'text-rose-600' },
};

export function StatCard({ icon: Icon, title, value, trend, suffix = '', trendSuffix = '%', trendUpIsGood = true, color = 'blue', className }: StatCardProps) {
  const colors = colorMap[color];
  const isPositiveTrend = trend !== undefined && trend > 0;
  const isGoodTrend = trendUpIsGood ? isPositiveTrend : !isPositiveTrend;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white rounded-2xl p-6 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-start justify-between group transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1", className)}
    >
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className={cn("p-2 rounded-lg", colors.bg, colors.text)}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-600">{title}</h3>
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold text-slate-800">{value}</span>
          {suffix && <span className="text-sm font-medium text-slate-500">{suffix}</span>}
        </div>
      </div>
      
      {trend !== undefined && (
        <div className={cn(
          "px-2.5 py-1 rounded-full text-xs font-bold mt-1 inline-flex items-center",
          isGoodTrend ? cn(colors.trendBg, colors.trendText) : cn(colors.trendDownBg, colors.trendDownText)
        )}>
          {isPositiveTrend ? '↑' : '↓'} {Math.abs(trend)}{trendSuffix}
        </div>
      )}
    </motion.div>
  );
}
