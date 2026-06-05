import React from 'react';
import { StatCard } from '../StatCard';
import { LineChart as LineChartIcon, TrendingUp, Lightbulb, CalendarCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { classTrendDataNew as trendData } from '@/mock-data';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function YearTrend() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">考试名称:</span>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-blue-500">
                <option>2024年春季期中考试</option>
            </select>
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">年级:</span>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-blue-500">
                <option>高一年级</option>
            </select>
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">学期:</span>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-blue-500">
                <option>2023-2024学年第二学期</option>
            </select>
        </div>
        <div className="flex-1" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            生成分析
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          icon={<LineChartIcon className="w-7 h-7" />} 
          title="当前均分" 
          value={<span className="text-blue-600">78.6</span>} 
          color="blue"
        />
        <StatCard 
          icon={<TrendingUp className="w-7 h-7" />} 
          title="较上次提升" 
          value={<span className="text-emerald-500">+2.5</span>} 
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-semibold text-slate-800">近五次考试成绩趋势</h3>
              <div className="flex space-x-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center"><span className="w-3 h-3 bg-blue-600 rounded-sm mr-2"></span>年级均分 (分)</div>
                  <div className="flex items-center"><span className="w-3 h-3 bg-emerald-500 rounded-sm mr-2"></span>及格率 (%)</div>
              </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis yAxisId="left" domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 />
                <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="value" 
                    name="年级均分(分)"
                    stroke="#2563eb" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#2563eb' }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
                />
                <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="passRate" 
                    name="及格率(%)"
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#10b981' }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            >
                <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800">趋势结论</h3>
                </div>
                <ul className="space-y-4 text-sm text-slate-600">
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-0.5">●</span>
                        年级均分持续上升，本次达到 78.6 分，创造五次新高。
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-0.5">●</span>
                        及格率稳步提升，本次为 89.3%，接近 90%。
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-0.5">●</span>
                        整体趋势向好，学习效果持续改善。
                    </li>
                </ul>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            >
                <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mr-3">
                        <CalendarCheck className="w-4 h-4 text-indigo-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800">关键节点</h3>
                </div>
                <div className="space-y-4 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                    <div className="relative pl-6">
                        <span className="absolute left-0 top-1.5 w-3 h-3 bg-blue-600 rounded-full ring-4 ring-white" />
                        <h4 className="text-sm font-semibold text-slate-800 mb-1">2024年春季期中考试</h4>
                        <p className="text-xs text-slate-500">均分 78.6，及格 89.3%，再创新高</p>
                    </div>
                    <div className="relative pl-6">
                        <span className="absolute left-0 top-1.5 w-3 h-3 bg-slate-300 rounded-full ring-4 ring-white" />
                        <h4 className="text-sm font-semibold text-slate-700 mb-1">2023-2024学年末考试</h4>
                        <p className="text-xs text-slate-500">均分 76.1，期末复习效果显著</p>
                    </div>
                    <div className="relative pl-6">
                        <span className="absolute left-0 top-1.5 w-3 h-3 bg-slate-300 rounded-full ring-4 ring-white" />
                        <h4 className="text-sm font-semibold text-slate-700 mb-1">2023年期中考试</h4>
                        <p className="text-xs text-slate-500">均分 68.7，及格 81.2%，夯实基础</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
