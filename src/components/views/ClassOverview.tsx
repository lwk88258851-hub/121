import React from 'react';
import { StatCard } from '../StatCard';
import { Users, LineChart as LineChartIcon, Medal, Lightbulb, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { scoreDistributionData, classVsGradeData, classTrendDataNew as trendData } from '@/mock-data';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function ClassOverview({ analysisType = 'multiple' }: { analysisType?: 'single' | 'multiple' }) {
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
            <span className="text-sm text-slate-500">班级:</span>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-blue-500">
                <option>高一(3)班</option>
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
          title="班级人数" 
          value="54" 
          color="blue"
        />
        <StatCard 
          icon={<LineChartIcon className="w-7 h-7" />} 
          title="班级均分" 
          value={<span className="text-emerald-500">78.6</span>} 
          color="emerald"
        />
        <StatCard 
          icon={<Medal className="w-7 h-7" />} 
          title="及格率" 
          value={<span className="text-orange-500">96.3%</span>} 
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
          <h3 className="text-base font-semibold text-slate-800 mb-2">
            {analysisType === 'single' ? '班级成绩分布' : '班级历次排名趋势'}
          </h3>
          <p className="text-xs text-slate-400 mb-6 font-medium">
            {analysisType === 'single' ? '人数' : '名次'}
          </p>
          <div className="h-64">
            {analysisType === 'single' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistributionData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis domain={[0, 25]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                      {scoreDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="#3b82f6" />
                      ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis domain={[1, 10]} reversed axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   />
                  <Line 
                      type="monotone" 
                      dataKey="value" // We just reuse trendData.value as ranking for demo
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#8b5cf6' }}
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
            <div className="text-center text-xs text-slate-500 mt-2">
              {analysisType === 'single' ? '分数段' : '考试场次'}
            </div>
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-semibold text-slate-800">班级与年级均分对比</h3>
            <div className="flex space-x-3 text-xs">
                <span className="flex items-center text-slate-600"><div className="w-3 h-3 bg-blue-600 rounded-sm mr-1"></div>班级均分</span>
                <span className="flex items-center text-slate-600"><div className="w-3 h-3 bg-blue-200 rounded-sm mr-1"></div>年级均分</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-4 font-medium">分数</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classVsGradeData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 />
                <Bar dataKey="class" name="班级均分" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="grade" name="年级均分" fill="#bfdbfe" radius={[4, 4, 0, 0]} barSize={16} />
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
            <h4 className="font-semibold text-blue-900 mb-1 leading-none pt-1">班级表现洞察</h4>
            <p className="text-sm text-slate-600">本班整体表现良好，均分高于年级平均水平；优秀率较高，及格率达到96.3%。数学、英语表现突出，物理、化学需继续加强，建议关注中低分段学生的提升。</p>
        </div>
      </motion.div>
    </div>
  );
}
