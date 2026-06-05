import React from 'react';
import { StatCard } from '../StatCard';
import { Users, TrendingUp, TrendingDown, Medal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { classComparisonData } from '@/mock-data';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function ClassComparison() {
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
          title="班级总数" 
          value="8" 
          color="blue"
        />
        <StatCard 
          icon={<TrendingUp className="w-7 h-7" />} 
          title="最高班均分" 
          value={<span className="text-emerald-500">83.6</span>} 
          color="emerald"
        />
        <StatCard 
          icon={<TrendingDown className="w-7 h-7" />} 
          title="最低班均分" 
          value={<span className="text-orange-500">65.2</span>} 
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-3"
        >
          <h3 className="text-base font-semibold text-slate-800 mb-6">班级平均分对比</h3>
          <div className="h-72 mt-8">
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
          </div>
          <div className="flex justify-center mt-4">
              <div className="flex items-center text-xs text-slate-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2" />
                  班级平均分
              </div>
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            >
                <h3 className="text-base font-semibold text-slate-800 mb-4">优秀班级</h3>
                <div className="space-y-3">
                    <div className="flex text-xs text-slate-400 font-medium px-2">
                        <span className="w-12">排名</span>
                        <span className="flex-1">班级</span>
                        <span className="w-16 text-right">平均分</span>
                    </div>
                    {classComparisonData.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm px-2 py-2 hover:bg-slate-50 rounded-md transition-colors">
                            <span className="w-12 flex items-center justify-center">
                                {idx === 0 ? <Medal className="w-5 h-5 text-amber-500" /> :
                                 idx === 1 ? <Medal className="w-5 h-5 text-slate-400" /> :
                                 <Medal className="w-5 h-5 text-orange-400" />}
                            </span>
                            <span className="flex-1 font-medium text-slate-700">{item.class}</span>
                            <span className="w-16 text-right text-blue-600 font-semibold">{item.score.toFixed(1)}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            >
                <h3 className="text-base font-semibold text-slate-800 mb-4">待提升班级</h3>
                <div className="space-y-3">
                    <div className="flex text-xs text-slate-400 font-medium px-2">
                        <span className="w-10">排名</span>
                        <span className="w-20">班级</span>
                        <span className="w-16 text-right">平均分</span>
                        <span className="flex-1 text-right">建议</span>
                    </div>
                    {classComparisonData.slice(-3).map((item, idx, arr) => (
                        <div key={idx} className="flex items-center text-sm px-2 py-2 hover:bg-slate-50 rounded-md transition-colors">
                            <span className="w-10 text-slate-500 font-medium">{classComparisonData.length - arr.length + idx + 1}</span>
                            <span className="w-20 font-medium text-slate-700">{item.class}</span>
                            <span className="w-16 text-right text-blue-600 font-semibold mr-4">{item.score.toFixed(1)}</span>
                            <span className="flex-1 text-right text-xs text-slate-500 truncate" title={
                                idx === 0 ? '加强基础训练，提升课堂参与度' :
                                idx === 1 ? '关注薄弱学科，强化针对性辅导' : '巩固基础，提升学习方法与效率'
                            }>
                                {idx === 0 ? '加强基础训练，提升课堂参与度' :
                                 idx === 1 ? '关注薄弱学科，强化针对性辅导' : '巩固基础，提升学习方法与效率'}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
