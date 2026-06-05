import React from 'react';
import { StatCard } from '../StatCard';
import { BookOpen, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { knowledgePointData } from '@/mock-data';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function SubjectKnowledge() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button className="px-4 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-700">科目概览</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-700">题型分析</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-white text-blue-600 shadow-sm">知识点分析</button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          icon={<BookOpen className="w-7 h-7" />} 
          title="核心知识点" 
          value={<span className="text-blue-600">7 <span className="text-base font-normal text-slate-500">项</span></span>} 
          color="blue"
        />
        <StatCard 
          icon={<TrendingUp className="w-7 h-7" />} 
          title="平均掌握率" 
          value={<span className="text-emerald-500">67.8%</span>} 
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-3"
        >
          <h3 className="text-base font-semibold text-slate-800 mb-6">知识点掌握情况</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={knowledgePointData} margin={{ top: 0, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#475569' }} width={80} />
                <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(val) => [`${val}%`, '掌握率']}
                 />
                <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={16}>
                  {knowledgePointData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#3b82f6" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center text-xs text-slate-500 mt-2">掌握率 (%)</div>
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            >
                <h3 className="text-base font-semibold text-slate-800 mb-4">薄弱知识点</h3>
                <div className="space-y-3">
                    {[...knowledgePointData].sort((a, b) => a.rate - b.rate).slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm px-2 py-2.5 bg-slate-50/50 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100/50">
                            <span className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3",
                                idx === 0 ? "bg-orange-100 text-orange-600" :
                                idx === 1 ? "bg-amber-100 text-amber-600" :
                                "bg-rose-100 text-rose-600"
                            )}>
                                {idx + 1}
                            </span>
                            <span className="flex-1 font-medium text-slate-700">{item.name}</span>
                            <span className="text-orange-500 font-semibold">{item.rate.toFixed(1)}%</span>
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
                <h3 className="text-base font-semibold text-slate-800 mb-4">改进建议</h3>
                <ul className="space-y-4 text-sm text-slate-600">
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-0.5">●</span>
                        加强解析几何相关概念与题型的系统训练。
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-0.5">●</span>
                        通过典型例题拆解，提升立体几何空间想象与建模能力。
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-0.5">●</span>
                        结合向量运算与几何应用题，强化平面向量综合训练。
                    </li>
                </ul>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
