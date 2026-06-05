import React from 'react';
import { StatCard } from '../StatCard';
import { Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { classTrendDataNew as trendData, topImprovedStudents, warningStudents } from '@/mock-data';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function ClassProgress() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          icon={<Users className="w-7 h-7" />} 
          title="进步人数" 
          value="23" 
          color="blue"
        />
        <StatCard 
          icon={<TrendingUp className="w-7 h-7" />} 
          title="平均提升" 
          value={<span className="text-emerald-500">6.2名</span>} 
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
          <h3 className="text-base font-semibold text-slate-800 mb-6">班级平均分变化趋势</h3>
          <div className="h-64">
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
          </div>
        </motion.div>

        <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            >
            <h3 className="text-base font-semibold text-slate-800 mb-4">进步学生 TOP 5</h3>
            <div className="space-y-3">
                <div className="flex text-xs text-slate-400 font-medium px-2">
                    <span className="w-12">排名</span>
                    <span className="flex-1">学生姓名</span>
                    <span className="w-16 text-right">名次变化</span>
                </div>
                {topImprovedStudents.map((student) => (
                    <div key={student.rank} className="flex items-center text-sm px-2 py-1.5 hover:bg-slate-50 rounded-md transition-colors">
                        <span className="w-12 flex items-center justify-center">
                            <span className={cn(
                                "w-5 h-5 flex items-center justify-center rounded-sm text-xs font-bold",
                                student.rank === 1 ? "bg-amber-100 text-amber-600" :
                                student.rank === 2 ? "bg-slate-100 text-slate-500" :
                                student.rank === 3 ? "bg-orange-100 text-orange-600" :
                                "text-slate-400"
                            )}>
                                {student.rank}
                            </span>
                        </span>
                        <span className="flex-1 font-medium text-slate-700">{student.name}</span>
                        <span className="w-16 text-right text-emerald-500 font-semibold">{student.change}</span>
                    </div>
                ))}
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 py-1">查看全部 &gt;</button>
            </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            >
            <h3 className="text-base font-semibold text-slate-800 mb-4">退步预警</h3>
            <div className="space-y-3">
                <div className="flex text-xs text-slate-400 font-medium px-2">
                    <span className="flex-1">学生姓名</span>
                    <span className="flex-1 text-right">预警说明</span>
                </div>
                {warningStudents.map((student, idx) => (
                    <div key={idx} className="flex items-start text-sm px-2 py-1.5 hover:bg-slate-50 rounded-md transition-colors">
                        <span className="flex-1 flex items-center font-medium text-slate-700">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-500 mr-1.5" />
                            {student.name}
                        </span>
                        <span className="flex-1 text-right text-slate-500 text-xs">{student.reason}</span>
                    </div>
                ))}
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 py-1">查看全部 &gt;</button>
            </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
