import React from 'react';
import { StatCard } from '../StatCard';
import { Users, LineChart as LineChartIcon, Medal, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { classTrendDataNew as trendData, subjectAvgData, gradeScoreDistData } from '@/mock-data';
import { motion } from 'motion/react';

export function YearOverview({ analysisType = 'multiple' }: { analysisType?: 'single' | 'multiple' }) {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<Users className="w-7 h-7" />} 
          title="参考人数" 
          value="1,256" 
          color="blue"
        />
        <StatCard 
          icon={<LineChartIcon className="w-7 h-7" />} 
          title="年级均分" 
          value={<span className="text-emerald-500">78.6</span>} 
          color="emerald"
        />
        <StatCard 
          icon={<Medal className="w-7 h-7" />} 
          title="优秀率" 
          value={<span className="text-amber-500">23.4%</span>} 
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <h3 className="text-base font-semibold text-slate-800 mb-6">
            {analysisType === 'single' ? '年级总分分段分布' : '近五次考试平均分趋势'}
          </h3>
          <div className="h-64">
            {analysisType === 'single' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeScoreDistData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     />
                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#2563eb" 
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#2563eb' }}
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <h3 className="text-base font-semibold text-slate-800 mb-6">各科平均分概览</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAvgData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#475569' }} width={50} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16}>
                  {
                    subjectAvgData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#3b82f6" />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 flex items-start space-x-4"
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 flex flex-shrink-0 items-center justify-center">
            <Lightbulb className="w-5 h-5 text-blue-600" />
        </div>
        <div>
            <h4 className="font-semibold text-blue-900 mb-1 leading-none pt-1">总结与洞察</h4>
            <p className="text-sm text-slate-600">年级平均分呈稳步上升趋势，整体表现良好；数学和物理平均分相对较低，建议重点关注，提升学科教学效果。</p>
        </div>
      </motion.div>

    </div>
  );
}
