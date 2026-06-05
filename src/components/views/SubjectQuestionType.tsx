import React from 'react';
import { StatCard } from '../StatCard';
import { FileCheck, PenTool, Lightbulb } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { questionTypeData } from '@/mock-data';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function SubjectQuestionType() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button className="px-4 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-700">科目概览</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-white text-blue-600 shadow-sm">题型分析</button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          icon={<FileCheck className="w-7 h-7" />} 
          title="客观题得分率" 
          value={<span className="text-blue-600">82.6%</span>} 
          color="blue"
        />
        <StatCard 
          icon={<PenTool className="w-7 h-7" />} 
          title="主观题得分率" 
          value={<span className="text-emerald-500">68.1%</span>} 
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <h3 className="text-base font-semibold text-slate-800 mb-6">题型得分占比</h3>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={questionTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {questionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-400">题型得分</span>
                <span className="text-sm font-semibold text-slate-700">占比</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <h3 className="text-base font-semibold text-slate-800 mb-6">题型表现说明</h3>
          <div className="space-y-4">
              <div className="flex border-b border-slate-100 pb-2 text-xs text-slate-400 font-medium">
                  <span className="flex-1">题型</span>
                  <span className="w-20 text-right">得分率</span>
              </div>
              {questionTypeData.map((item, idx) => (
                  <div key={idx} className="flex items-center text-sm py-1">
                      <span className="flex-1 flex items-center text-slate-700">
                          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.fill }} />
                          {item.name}
                      </span>
                      <span className={cn(
                          "w-20 text-right font-medium",
                          item.value > 80 ? "text-blue-600" : 
                          item.value > 70 ? "text-emerald-500" :
                          item.value > 60 ? "text-amber-500" : "text-rose-500"
                      )}>
                          {item.value.toFixed(1)}%
                      </span>
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
          <div className="flex items-center mb-6">
            <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-base font-semibold text-slate-800">教学建议</h3>
          </div>
          <ul className="space-y-4 text-sm text-slate-600 list-disc pl-4 marker:text-blue-400">
              <li>巩固选择题和填空题的基础训练，保持优势。</li>
              <li>加强解答题的解题规范与步骤训练，提升得分率。</li>
              <li>综合题得分率偏低，建议开展专题训练，提升综合应用能力。</li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
