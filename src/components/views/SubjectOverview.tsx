import React from 'react';
import { StatCard } from '../StatCard';
import { LineChart as LineChartIcon, Medal, CheckCircle, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { classComparisonData, subjectScoreDistData, classTrendDataNew as trendData } from '@/mock-data';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function SubjectOverview({ analysisType = 'multiple' }: { analysisType?: 'single' | 'multiple' }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-white text-blue-600 shadow-sm">科目概览</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-700">题型分析</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-700">知识点分析</button>
        </div>
        <div className="h-6 w-px bg-slate-200 mx-2" />
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
            <span className="text-sm text-slate-500">科目:</span>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-blue-500">
                <option>数学</option>
            </select>
        </div>
        <div className="flex-1" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            生成分析
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<LineChartIcon className="w-7 h-7" />} 
          title="科目均分" 
          value={<span className="text-blue-600">76.5</span>} 
          color="blue"
        />
        <StatCard 
          icon={<Medal className="w-7 h-7" />} 
          title="优秀率" 
          value={<span className="text-orange-500">24.3%</span>} 
          color="amber"
        />
        <StatCard 
          icon={<CheckCircle className="w-7 h-7" />} 
          title="及格率" 
          value={<span className="text-emerald-500">91.2%</span>} 
          color="emerald"
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
            {analysisType === 'single' ? '各班数学平均分对比' : '历次考试数学均分趋势'}
          </h3>
          <div className="h-72">
            {analysisType === 'single' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classComparisonData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={24}>
                      {classComparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="#3b82f6" />
                      ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis domain={['dataMin - 10', 'dataMax + 10']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   />
                  <Line 
                      type="monotone" 
                      dataKey="value" // Mocking using trend data
                      stroke="#f59e0b" // Amber color to differentiate
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#f59e0b' }}
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#f59e0b' }}
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
          <h3 className="text-base font-semibold text-slate-800 mb-6">学生分数分布</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectScoreDistData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis domain={[0, 40]} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value}%`, '人数占比']}
                 />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                    {subjectScoreDistData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#3b82f6" />
                    ))}
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
            <h4 className="font-semibold text-blue-900 mb-1 leading-none pt-1">分析建议</h4>
            <p className="text-sm text-slate-600">数学平均分整体表现良好，优秀率有提升空间。建议加强70分以下学生的基础知识巩固，并针对中高分段学生进行拓展提升训练。</p>
        </div>
      </motion.div>
    </div>
  );
}
